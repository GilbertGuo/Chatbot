package com.cscc01.chatbot.backend.usersystem;

import com.cscc01.chatbot.backend.model.Role;

public class UserDto {

    private Role role;
    private String username;

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
