package com.nadish.libraryManagementSystem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import javax.validation.constraints.NotBlank;

import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "book")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private ObjectId ID;
    @NotBlank(message = "This field can't be empty")
    private String id;
    private String bookId;
    @NotBlank(message = "This field can't be empty")
    private String authorName;
    @NotBlank(message = "This field can't be empty")
    private String title;
    //    @NotBlank(message = "This field can't be empty")
    private String publication;
    @NotBlank(message = "This field can't be empty")
    private String isbn;
    @NotBlank(message = "This field can't be empty")
    private boolean isAvailable;
    @NotBlank(message = "This field can't be empty")
    private String description;

    private boolean isLibraryBook = true;
//    @NotBlank(message = "This field can't be empty")
    private String amount = "FREE";
    private Object thumbnail;
}


