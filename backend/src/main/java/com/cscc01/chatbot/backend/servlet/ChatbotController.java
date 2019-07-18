package com.cscc01.chatbot.backend.servlet;

import com.cscc01.chatbot.backend.model.QueryResult;
import com.cscc01.chatbot.backend.model.UserQueryRequest;
import com.cscc01.chatbot.backend.querysystem.QuerySystemProcessor;
import org.apache.lucene.document.Document;
import org.apache.lucene.queryparser.classic.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/")
public class ChatbotController {

    private final Logger LOGGER = LoggerFactory.getLogger(ChatbotController.class);

    @Inject
    private QuerySystemProcessor querySystemProcessor;

//    @PreAuthorize("hasAuthority('USER')")
    @RequestMapping(value = "/query", method = RequestMethod.POST)
    public Map<String, Object> query(@RequestBody UserQueryRequest userQueryRequest) throws IOException, ParseException {

        return querySystemProcessor.getResponse(userQueryRequest.getMessage());
    }

}
