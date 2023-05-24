package com.nadish.libraryManagementSystem.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserLoginDto {
    private String email;
    private String password;

}
