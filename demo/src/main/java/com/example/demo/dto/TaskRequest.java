package com.example.demo.dto;


import com.example.demo.entities.Task;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

// Task DTOs
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequest {
    @NotBlank(message = "Title is required")
    @Size(max = 200)
    private String title;

    @Size(max = 1000)
    private String description;

    private Task.TaskStatus status;
    private Task.Priority priority;
    private LocalDateTime dueDate;
}