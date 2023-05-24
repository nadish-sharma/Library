package com.nadish.libraryManagementSystem.controller;
import com.nadish.libraryManagementSystem.model.Book;
import com.nadish.libraryManagementSystem.model.User;
import com.nadish.libraryManagementSystem.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/book")
public class BookController {
    @Autowired
    private BookService bookService;
//    @GetMapping
//    public ResponseEntity<List<Book>> allBooks(){
//        return new ResponseEntity<List<Book>>(bookService.getAllBooks(), HttpStatus.OK);
//    }
    //    @GetMapping("/{id}")
//    public ResponseEntity<Optional<Book>> singleBook(@PathVariable ObjectId id) {
//        return new ResponseEntity<Optional<Book>>(bookService.singleBook(id), HttpStatus.OK);
//    }
//    @GetMapping("/{bookId}")
//    public ResponseEntity<Optional<Book>> getSingleBook(@PathVariable String bookId) {
//        return new ResponseEntity<Optional<Book>>(bookService.getSingleBook(bookId), HttpStatus.OK);
//    }
//    @GetMapping("/{title}")
//    public ResponseEntity<Optional<Book>> getSingleBookTitle(@PathVariable String title) {
//        return new ResponseEntity<Optional<Book>>(bookService.getSingleBookTitle(title), HttpStatus.OK);
//    }

    @GetMapping("/{title}")
    public ResponseEntity<List<Book>> getBooksByTitle(@PathVariable String title) {
        List<Book> books = bookService.getSingleBookTitle(title);
        if (!books.isEmpty()) {
            return ResponseEntity.ok(books);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping
    public ResponseEntity<List<Book>> getBooks() {
        List<Book> books = bookService.getAllBooks();
        if (!books.isEmpty()) {
            return ResponseEntity.ok(books);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{bookId}")
    public ResponseEntity<Void> deleteBook(@PathVariable String bookId) {
        bookService.deleteBook(bookId);
        return ResponseEntity.noContent().build();
    }
    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        Book newBook = bookService.createBook(book);
        return new ResponseEntity<Book>(newBook, HttpStatus.CREATED);
    }

    @PutMapping("/{bookId}")
    public ResponseEntity<Book> updateBook(@PathVariable String bookId, @RequestBody Book updatedBook) {
        Book book = bookService.updateBook(bookId, updatedBook);
        return ResponseEntity.ok().body(book);
    }


//    @GetMapping("/admin/{isAdmin}")
//    public ResponseEntity<List<Book>> getBooksByAdminStatus(@PathVariable boolean isAdmin) {
//        List<Book> books = bookService.getBooksByAdminStatus(isAdmin);
//        return new ResponseEntity<List<Book>>(books, HttpStatus.OK);
//    }

    //    @GetMapping("/{email}")
//    public ResponseEntity<Optional><Book> getbookByEmail(@PathVariable String email) {
//        book book
//    }
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody bookLoginDto bookLoginDto) {
//        // Retrieve book from database using the email in bookLoginDto
//        book book = bookService.getbookByEmail(bookLoginDto.getEmail());
//        // Validate book's password
//        if (book != null && book.getPassword().equals(bookLoginDto.getPassword())) {
//            // Passwords match, return success response
//            return new ResponseEntity<>("Login successful", HttpStatus.OK);
//        } else {
//            // Invalid bookname or password, return error response
//            return new ResponseEntity<>("Invalid bookname or password", HttpStatus.UNAUTHORIZED);
//        }
//    }
}
