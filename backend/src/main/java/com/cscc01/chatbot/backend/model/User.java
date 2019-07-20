package com.cscc01.chatbot.backend.model;

import com.cscc01.chatbot.backend.usersystem.UserDto;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    // @Column(unique = true)
    private String username;

    private String encryptedPassword;

    private Role role;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() { 
        return String.format("This is " + username); 
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public UserDto toUserDto() {
        UserDto dto = new UserDto();
        dto.setRole(this.role);
        dto.setUsername(this.username);
        return dto;
    }

    public String getEncryptedPassword() {
        return encryptedPassword;
    }

    public void setEncryptedPassword(String encryptedPassword) {
        this.encryptedPassword = encryptedPassword;
    }
}
