package com.cscc01.chatbot.backend.model;


public class UrlUploadRequest {

    private String url;

    UrlUploadRequest() {}

    UrlUploadRequest(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }
}
