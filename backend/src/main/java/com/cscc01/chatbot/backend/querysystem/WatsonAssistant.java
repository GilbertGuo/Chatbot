package com.cscc01.chatbot.backend.querysystem;


import com.ibm.cloud.sdk.core.service.security.IamOptions;
import com.ibm.watson.assistant.v2.Assistant;
import com.ibm.watson.assistant.v2.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class WatsonAssistant {

    private Assistant service;

    public WatsonAssistant(@Value("${assistant.apikey}") String apiKey,
                           @Value("${assistant.version}") String version) {
        IamOptions options = new IamOptions.Builder()
                .apiKey(apiKey)
                .build();
        service = new Assistant(version, options);

    }

    public MessageOptions createMessageOption(@Value("${assistant.id}") String assistantId) {
        CreateSessionOptions createSessionOptions = new CreateSessionOptions.Builder(assistantId).build();
        SessionResponse session = service.createSession(createSessionOptions).execute().getResult();
        String sessionId = session.getSessionId();

        // Start conversation with empty message.
        MessageOptions messageOptions = new MessageOptions.Builder(assistantId,
                sessionId).build();
        return messageOptions;
    }

//    public String startConversation(String text) {
//        MessageResponse response = service.message(messageOptions).execute().getResult();
//
//        // Print the output from dialog, if any. Assumes a single text response.
//        System.out.println(response.getOutput().getGeneric().get(0).getText());
//    }

}
