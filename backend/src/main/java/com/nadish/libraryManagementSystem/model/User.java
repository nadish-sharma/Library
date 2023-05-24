package com.nadish.libraryManagementSystem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import javax.validation.constraints.NotBlank;

import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private ObjectId id;
    @NotBlank(message = "This field can't be empty")
    private String userId;
    @NotBlank(message = "This field can't be empty")
    private String firstName;
    @NotBlank(message = "This field can't be empty")
    private String lastName;
    @NotBlank(message = "This field can't be empty")
    private String email;
    @NotBlank(message = "This field can't be empty")
    private String password;
    @NotBlank(message = "This field can't be empty")
    private boolean isAdmin;
}


