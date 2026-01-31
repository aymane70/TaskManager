package com.example.demo.service;


import com.example.demo.dto.*;
import com.example.demo.entities.Task;
import com.example.demo.entities.Task.Priority;
import com.example.demo.entities.Task.TaskStatus;
import com.example.demo.entities.User;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public TaskResponse createTask(TaskRequest request) {
        User user = getCurrentUser();

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus() != null ? request.getStatus() : TaskStatus.TODO)
                .priority(request.getPriority() != null ? request.getPriority() : Priority.MEDIUM)
                .dueDate(request.getDueDate())
                .user(user)
                .build();

        task = taskRepository.save(task);
        return mapToResponse(task);
    }

    public PageResponse<TaskResponse> getTasks(int page, int size, String sortBy,
                                               String sortDir, String search,
                                               TaskStatus status, Priority priority) {
        User user = getCurrentUser();
        Sort sort = sortDir.equalsIgnoreCase("desc") ?
                Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Task> taskPage;

        if (search != null && !search.isEmpty()) {
            taskPage = taskRepository.searchTasks(user.getId(), search, pageable);
        } else if (status != null) {
            taskPage = taskRepository.findByUserIdAndStatus(user.getId(), status, pageable);
        } else if (priority != null) {
            taskPage = taskRepository.findByUserIdAndPriority(user.getId(), priority, pageable);
        } else {
            taskPage = taskRepository.findByUserId(user.getId(), pageable);
        }

        List<TaskResponse> tasks = taskPage.getContent().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return PageResponse.<TaskResponse>builder()
                .content(tasks)
                .pageNumber(taskPage.getNumber())
                .pageSize(taskPage.getSize())
                .totalElements(taskPage.getTotalElements())
                .totalPages(taskPage.getTotalPages())
                .last(taskPage.isLast())
                .build();
    }

    public TaskResponse getTaskById(Long id) {
        User user = getCurrentUser();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to task");
        }

        return mapToResponse(task);
    }

    public TaskResponse updateTask(Long id, TaskRequest request) {
        User user = getCurrentUser();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to task");
        }

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        if (request.getStatus() != null) {
            task.setStatus(request.getStatus());
        }
        if (request.getPriority() != null) {
            task.setPriority(request.getPriority());
        }
        task.setDueDate(request.getDueDate());

        task = taskRepository.save(task);
        return mapToResponse(task);
    }

    public void deleteTask(Long id) {
        User user = getCurrentUser();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to task");
        }

        taskRepository.delete(task);
    }

    public TaskStatistics getStatistics() {
        User user = getCurrentUser();

        return TaskStatistics.builder()
                .totalTasks(taskRepository.countByUserId(user.getId()))
                .todoTasks(taskRepository.countByUserIdAndStatus(user.getId(), TaskStatus.TODO))
                .inProgressTasks(taskRepository.countByUserIdAndStatus(user.getId(), TaskStatus.IN_PROGRESS))
                .doneTasks(taskRepository.countByUserIdAndStatus(user.getId(), TaskStatus.DONE))
                .highPriorityTasks(taskRepository.countByUserIdAndPriority(user.getId(), Priority.HIGH))
                .mediumPriorityTasks(taskRepository.countByUserIdAndPriority(user.getId(), Priority.MEDIUM))
                .lowPriorityTasks(taskRepository.countByUserIdAndPriority(user.getId(), Priority.LOW))
                .build();
    }

    private TaskResponse mapToResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .username(task.getUser().getUsername())
                .build();
    }
}