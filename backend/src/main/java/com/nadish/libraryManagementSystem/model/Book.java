package com.nadish.libraryManagementSystem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;


@Document(collection = "book")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private ObjectId ID;
//    @NotBlank(message = "This field can't be empty")
    private ObjectId id;
    private String bookId;
//    @NotBlank(message = "This field can't be empty")
    private String authorName;
//    @NotBlank(message = "This field can't be empty")
    private String title;
    //    @NotBlank(message = "This field can't be empty")
    private String publication;
//    @NotBlank(message = "This field can't be empty")
private String publishedDate;
    //    @NotBlank(message = "This field can't be empty")
    private String isbn;
//    @NotBlank(message = "This field can't be empty")
    private boolean available;
//    @NotBlank(message = "This field can't be empty")
    private String description;

    private boolean libraryBook = true;
//    @NotBlank(message = "This field can't be empty")
    private String amount = "FREE";
    private String currency;
    private String saleability;
    private Object thumbnail;

    private String issuedTo;
    private Date issueDate;
    private Date expectedReturnDate;
    private Date returnDate;
    private String status;


}


