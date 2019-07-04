package com.cscc01.chatbot.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class DocumentModification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private long documentId;
    private String modifiedUser;
    private String modifiedTime;

    public DocumentModification(long documentId, String modifiedUser, String modifiedTime){
        this.documentId = documentId;
        this.modifiedUser = modifiedUser;
        this.modifiedTime = modifiedTime;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getDocumentId() {
        return documentId;
    }

    public void setDocumentId(long documentId) {
        this.documentId = documentId;
    }


    public String getModifiedTime() {
        return modifiedTime;
    }

    public void setName(String modifiedTime) {
        this.modifiedTime = modifiedTime;
    }

    public String getModifiedUser() {
        return modifiedUser;
    }

    public void setModifiedUser(String modifiedUser) {
        this.modifiedUser = modifiedUser;
    }

}
