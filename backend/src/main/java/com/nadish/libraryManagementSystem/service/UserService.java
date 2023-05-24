package com.nadish.libraryManagementSystem.service;

import com.nadish.libraryManagementSystem.model.User;
import com.nadish.libraryManagementSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired //We want the framework to instantiate this(UserRepository) class for us
    private UserRepository userRepository;
    public List<User> allUsers() {
        return userRepository.findAll();
    }
//    public Optional<User> singleUser(ObjectId id) {
//        return userRepository.findById(id);
//    }
    public Optional<User> getSingleUser(String userId) {
        return userRepository.findUserByUserId(userId);
    }
    public void deleteUser(String userId) {
        userRepository.deleteByUserId((userId));
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(String userId, User updatedUser) {
        Optional<User> optionalUser = userRepository.findUserByUserId(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            return userRepository.save(user);
        } else {
            throw new ResourceNotFoundException("User not found with userId: " + userId);
        }

    }

    public List<User> getUsersByAdminStatus(boolean isAdmin) {
        return userRepository.findByIsAdmin(isAdmin);
    }
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}
