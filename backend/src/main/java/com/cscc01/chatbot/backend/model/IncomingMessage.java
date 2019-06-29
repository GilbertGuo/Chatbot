package com.cscc01.chatbot.backend.model;

import java.util.UUID;

public class IncomingMessage {
    private final UUID id;
    public String content;

    public IncomingMessage() {
        this.id = UUID.randomUUID();
    }
}
