package com.cscc01.chatbot.backend.querysystem;


import com.ibm.cloud.sdk.core.service.security.IamOptions;
import com.ibm.watson.assistant.v2.Assistant;
import com.ibm.watson.assistant.v2.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.logging.LogManager;

@Service
public class WatsonAssistant {

    @Value("${assistant.apikey}")
    private String API_KEY;

    @Value("${assistant.version}")
    private String VERSION;

    @Value("${assistant.id}")
    private String ASSISTANT_ID;

    public Assistant createNewAssistant() {
        IamOptions options = new IamOptions.Builder()
                .apiKey(API_KEY)
                .build();
        return new Assistant(VERSION, options);

    }

    public SessionResponse createSession(Assistant service) {
        CreateSessionOptions createSessionOptions = new CreateSessionOptions.Builder(ASSISTANT_ID).build();

        return service.createSession(createSessionOptions).execute().getResult();
    }

    public MessageResponse getMessageResponse(String inputText, SessionResponse sessionResponse, Assistant assistant) {
        LogManager.getLogManager().reset();

        MessageInput input = new MessageInput.Builder().text(inputText).build();
        MessageOptions messageOptions = new MessageOptions.Builder(ASSISTANT_ID, sessionResponse.getSessionId())
                .input(input)
                .build();
        return assistant.message(messageOptions).execute().getResult();
    }

    public static void main(String[] args) {
        IamOptions iamOptions = new IamOptions.Builder().apiKey("dMb7uf0g-aG-SRxQW_AAI7FVd1UFKB3uN9aaFw1OM4RM").build();
        Assistant service = new Assistant("2019-02-28", iamOptions);
        String assistantId = "4c8963be-ad77-4c48-9619-54ced513eea7"; // replace with assistant ID

        // Create session.
        CreateSessionOptions createSessionOptions = new CreateSessionOptions.Builder(assistantId).build();
        SessionResponse session = service.createSession(createSessionOptions).execute().getResult();
        String sessionId = session.getSessionId();

        // Initialize with empty values to start the conversation.
        String inputText = "what is date today";
        String currentAction;

        // Main input/output loop
        do {
            // Clear any action flag set by the previous response.
            currentAction = "";

            // Send message to assistant.
            MessageInput input = new MessageInput.Builder().text(inputText).build();
            MessageOptions messageOptions = new MessageOptions.Builder(assistantId, sessionId)
                    .input(input)
                    .build();
            MessageResponse response = service.message(messageOptions).execute().getResult();

            // Print the output from dialog, if any. Assumes a single text response.
            List<DialogRuntimeResponseGeneric> responseGeneric = response.getOutput().getGeneric();
            if (responseGeneric.size() > 0) {
                System.out.println(response.getOutput().getGeneric().get(0).getText());
            }

            // Check for any actions requested by the assistant.
            List<DialogNodeAction> responseActions = response.getOutput().getActions();
            if (responseActions != null) {
                if (responseActions.get(0).getActionType().equals("client")) {
                    currentAction = responseActions.get(0).getName();
                }
            }

            // User asked what time it is, so we output the local system time.
            if (currentAction.equals("display_time")) {
                DateTimeFormatter fmt = DateTimeFormatter.ofPattern("h:mm:ss a");
                LocalTime time = LocalTime.now();
                System.out.println("The current time is " + time.format(fmt) + ".");
            }

            // If we're not done, prompt for next round of input.
            if (!currentAction.equals("end_conversation")) {
                System.out.print(">> ");
                inputText = "what time is it now?";
            }

        } while (!currentAction.equals("end_conversation"));

        // We're done, so we delete the session.
        DeleteSessionOptions deleteSessionOptions = new DeleteSessionOptions.Builder(assistantId, sessionId).build();
        service.deleteSession(deleteSessionOptions).execute();
    }
}

