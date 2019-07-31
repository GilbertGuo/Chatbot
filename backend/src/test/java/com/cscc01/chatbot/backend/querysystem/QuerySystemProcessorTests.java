//package com.cscc01.chatbot.backend.querysystem;
//
//
//import com.cscc01.chatbot.backend.indexer.WatsonDiscovery;
//import com.ibm.watson.assistant.v2.model.MessageResponse;
//import com.ibm.watson.assistant.v2.model.RuntimeIntent;
//import org.apache.lucene.queryparser.classic.ParseException;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.Mockito;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Primary;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import javax.inject.Inject;
//import java.io.IOException;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//public class QuerySystemProcessorTests {
//
//    @Inject
//    private QuerySystemProcessor querySystemProcessor;
//
////    @Inject
////    private WatsonAssistant watsonAssistant;
//
//    @Bean
//    @Primary
//    public WatsonAssistant watsonAssistantSpy(WatsonAssistant watsonAssistant) {
//        return Mockito.spy(watsonAssistant);
//    }
//
//    @Test
//    public void testEmptyMessage() throws IOException, ParseException {
//        MessageResponse response = Mockito.mock(MessageResponse.class);
//        RuntimeIntent intent1 = Mockito.mock(RuntimeIntent.class);
//        RuntimeIntent intent2 = Mockito.mock(RuntimeIntent.class);
//        WatsonAssistant watsonAssistant = Mockito.spy(WatsonAssistant.class);
//        Mockito.doNothing().when(watsonAssistant).createNewAssistant();
//        Mockito.doNothing().when(watsonAssistant).createSession(Mockito.any());
//        Mockito.doNothing().when(watsonAssistant).getMessageResponse(Mockito.anyString(), Mockito.any(), Mockito.any());
//
//        querySystemProcessor.getResponse("hello");
//
//
//
//    }
//}
