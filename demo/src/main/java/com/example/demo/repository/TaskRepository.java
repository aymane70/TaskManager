package com.example.demo.repository;


import com.example.demo.entities.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    Page<Task> findByUserId(Long userId, Pageable pageable);

    @Query("SELECT t FROM Task t WHERE t.user.id = :userId AND " +
            "(LOWER(t.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Task> searchTasks(@Param("userId") Long userId,
                           @Param("search") String search,
                           Pageable pageable);

    Page<Task> findByUserIdAndStatus(Long userId, Task.TaskStatus status, Pageable pageable);

    Page<Task> findByUserIdAndPriority(Long userId, Task.Priority priority, Pageable pageable);

    long countByUserIdAndStatus(Long userId, Task.TaskStatus status);

    long countByUserIdAndPriority(Long userId, Task.Priority priority);

    long countByUserId(Long userId);
}
