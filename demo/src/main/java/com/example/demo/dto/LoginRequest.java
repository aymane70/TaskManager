package com.example.demo.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

// Auth DTOs
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    private String password;
}




