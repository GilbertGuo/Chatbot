package com.cscc01.chatbot.backend.model;


public class UrlUploadRequest {

    private String url;
    private String admin;

    UrlUploadRequest() {}

    UrlUploadRequest(String url, String admin) {
        this.url = url;
        this.admin = admin;
    }

    public String getUrl() {
        return url;
    }

    public String getAdmin(){
        return admin;
    }
}
