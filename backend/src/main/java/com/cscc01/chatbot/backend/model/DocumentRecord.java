package com.cscc01.chatbot.backend.model;

import javax.persistence.*;

@Entity
public class DocumentRecord {

    @Id
    private String name;

    private String discoveryId;
    private String lastModified;
    private String lastModifiedUser;

    public DocumentRecord(){}

    public DocumentRecord(String name){
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastModified() {
        return lastModified;
    }

    public void setLastModified(String lastModified) {
        this.lastModified = lastModified;
    }

    public String getLastModifiedUser() {
        return lastModifiedUser;
    }

    public void setLastModifiedUser(String lastModifiedUser) {
        this.lastModifiedUser = lastModifiedUser;
    }

    public String getDiscoveryId() {
        return discoveryId;
    }

    public void setDiscoveryId(String discoveryId) {
        this.discoveryId = discoveryId;
    }
}
