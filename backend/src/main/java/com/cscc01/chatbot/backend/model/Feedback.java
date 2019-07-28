package com.cscc01.chatbot.backend.model;

import java.time.LocalDateTime;

import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "message", nullable = false)
    private String message;

    @CreationTimestamp
    private LocalDateTime createDateTime;

    public Feedback(){}

    public Feedback(String message){
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getCreateDateTime(){
        return createDateTime;
    }

    public void setCreateDateTime(LocalDateTime createDateTime){
        this.createDateTime = createDateTime;
    }

    @Override
    public String toString(){
        return this.message;
    }
}
