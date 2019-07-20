package com.cscc01.chatbot.backend.querysystem;


import com.ibm.watson.assistant.v2.Assistant;
import com.ibm.watson.assistant.v2.model.MessageResponse;
import com.ibm.watson.assistant.v2.model.SessionResponse;
import com.ibm.watson.natural_language_understanding.v1.model.AnalysisResults;
import org.apache.lucene.search.Query;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.inject.Inject;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AssistantTests {

    @Inject
    private WatsonAssistant watsonAssistant;


    @Test
    public void testEmptyMessage() {
        String text = "";
        Assistant assistantInstance = watsonAssistant.createNewAssistant();
        SessionResponse newSession = watsonAssistant.createSession(assistantInstance);
        MessageResponse response = watsonAssistant.getMessageResponse(text,newSession, assistantInstance);
        System.out.println(response);

    }

    @Test
    public void testNormalMessage() {
        String text = "Hello, I have a question, tell me about utsc?";
        Assistant assistantInstance = watsonAssistant.createNewAssistant();
        SessionResponse newSession = watsonAssistant.createSession(assistantInstance);
        MessageResponse response = watsonAssistant.getMessageResponse(text,newSession, assistantInstance);
        System.out.println(response.getOutput().getIntents().get(0));

    }
}
