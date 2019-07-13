package com.cscc01.chatbot.backend.servlet.security;


import com.cscc01.chatbot.backend.model.Role;
import com.cscc01.chatbot.backend.model.User;
import com.cscc01.chatbot.backend.usersystem.SignUpDto;
import com.cscc01.chatbot.backend.usersystem.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/")
public class AuthenticationController {

    @Inject
    private UserService userService;

    @Inject
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value = "/users/signup", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> userSignUp(@RequestBody SignUpDto signUpReq) {
        return handleUserSignUp(signUpReq, Role.USER);
    }

//    @PreAuthorize("hasAuthority('ADMIN')")
    @RequestMapping(value = "/users/admins/signup/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> adminSignUp(@RequestBody SignUpDto signUpReq) {
        return handleUserSignUp(signUpReq, Role.ADMIN);
    }

    private Map<String, Object> handleUserSignUp(@RequestBody SignUpDto signUpReq, Role role) {
        User user = new User();
        user.setEncryptedPassword(passwordEncoder.encode(signUpReq.getPassword()));
        user.setUsername(signUpReq.getUsername());
        user.setRole(role);
        userService.addNewUser(user);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "registered!!!");
        return response;
    }
}
