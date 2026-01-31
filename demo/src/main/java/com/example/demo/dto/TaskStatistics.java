package com.example.demo.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskStatistics {
    private long totalTasks;
    private long todoTasks;
    private long inProgressTasks;
    private long doneTasks;
    private long highPriorityTasks;
    private long mediumPriorityTasks;
    private long lowPriorityTasks;
}