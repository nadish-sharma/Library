package com.nadish.libraryManagementSystem.controller;
import com.nadish.libraryManagementSystem.model.User;
import com.nadish.libraryManagementSystem.model.UserLoginDto;
import com.nadish.libraryManagementSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping
    public ResponseEntity<List<User>> allUsers(){
        return new ResponseEntity<List<User>>(userService.allUsers(), HttpStatus.OK);
    }
//    @GetMapping("/{id}")
//    public ResponseEntity<Optional<User>> singleUser(@PathVariable ObjectId id) {
//        return new ResponseEntity<Optional<User>>(userService.singleUser(id), HttpStatus.OK);
//    }
    @GetMapping("/{userId}")
    public ResponseEntity<Optional<User>> getSingleUser(@PathVariable String userId) {
        return new ResponseEntity<Optional<User>>(userService.getSingleUser(userId), HttpStatus.OK);
    }
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User newUser = userService.createUser(user);
        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable String userId, @RequestBody User updatedUser) {
        User user = userService.updateUser(userId, updatedUser);
        return ResponseEntity.ok().body(user);
    }


    @GetMapping("/admin/{isAdmin}")
    public ResponseEntity<List<User>> getUsersByAdminStatus(@PathVariable boolean isAdmin) {
        List<User> users = userService.getUsersByAdminStatus(isAdmin);
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

//    @GetMapping("/{email}")
//    public ResponseEntity<Optional><User> getUserByEmail(@PathVariable String email) {
//        User user
//    }
@PostMapping("/login")
public ResponseEntity<String> login(@RequestBody UserLoginDto userLoginDto) {
    // Retrieve user from database using the email in userLoginDto
    User user = userService.getUserByEmail(userLoginDto.getEmail());
    // Validate user's password
    if (user != null && user.getPassword().equals(userLoginDto.getPassword())) {
        // Passwords match, return success response
        return new ResponseEntity<>("Login successful", HttpStatus.OK);
    } else {
        // Invalid username or password, return error response
        return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
    }
}
}
