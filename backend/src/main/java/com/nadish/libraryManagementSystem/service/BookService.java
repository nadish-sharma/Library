package com.nadish.libraryManagementSystem.service;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.nadish.libraryManagementSystem.model.Book;
import com.nadish.libraryManagementSystem.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    @Autowired //We want the framework to instantiate this(BookRepository) class for us
    private BookRepository BookRepository;
    public List<Book> getAllBooks() {
        return BookRepository.findAll();
    }

    public List<Book> getUnavailableBooks() {
        return BookRepository.findByAvailable(false);
    }
    public List<Book> getAvailableBooks() {
        return BookRepository.findByAvailable(true);
    }
//    public List<Book> getAllAvailableBooks(Boolean isAvailable) {return BookRepository.findAvailableBooks(isAvailable);}
    //    public Optional<Book> singleBook(ObjectId id) {
//        return BookRepository.findById(id);
//    }
//    public Optional<Book> getSingleBook(String bookId) {
//        return BookRepository.findBookByBookId(bookId);
//    }
    public List<Book> getSingleBookTitle(String title) {
        return BookRepository.findBooksByPartialTitle(title);
    }

    public void deleteBook(String bookId) {
        BookRepository.deleteByBookId((bookId));
    }

    public Book createBook(Book book) {
        return BookRepository.save(book);
    }

    public Book updateBook(String bookId, Book updatedBook) {
        Optional<Book> optionalBook = BookRepository.findBooksByBookId(bookId);
        if (!optionalBook.isEmpty()) {
            Book book = optionalBook.get();
            book.setTitle(updatedBook.getTitle());
            book.setAuthorName(updatedBook.getAuthorName());
            book.setIsbn(updatedBook.getIsbn());
            book.setBookId(updatedBook.getBookId());
            book.setDescription(updatedBook.getDescription());
            book.setPublication(updatedBook.getPublication());
            book.setAvailable(updatedBook.isAvailable());
            book.setLibraryBook(updatedBook.isLibraryBook());
            book.setThumbnail(updatedBook.getThumbnail());
            book.setIssuedTo(updatedBook.getIssuedTo());
            book.setIssueDate(updatedBook.getIssueDate());
            book.setExpectedReturnDate(updatedBook.getExpectedReturnDate());
            book.setStatus(updatedBook.getStatus());
//            book.setPassword(updatedBook.getPassword());
            return BookRepository.save(book);
        } else {
            throw new ResourceNotFoundException("Book not found with bookId: " + bookId);
        }

    }
//    public List<Book> getBooksByAdminStatus(boolean isAvailable) {
//        return BookRepository.findByIsAvailable(isAvailable);
//    }
    public Optional<Book> getBookByIsbn(String isbn) {
        return BookRepository.findBookByIsbn(isbn);
    }

    public Optional<Book> getSingleBookBookId(String bookId) {
        return BookRepository.findBooksByBookId(bookId);
    }
}
