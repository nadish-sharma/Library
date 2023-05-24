package com.nadish.libraryManagementSystem.repository;

import com.nadish.libraryManagementSystem.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {
   Optional<User> findUserByUserId(String userId);
   void deleteByUserId(String userId);
   List<User> findByIsAdmin(boolean isAdmin);

   User findByEmail(String email);

   //User  findByIsbn(String isbn);
}