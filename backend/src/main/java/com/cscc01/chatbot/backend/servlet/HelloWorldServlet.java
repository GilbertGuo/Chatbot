package com.cscc01.chatbot.backend.servlet;

import com.cscc01.chatbot.backend.model.MessageResponse;
import com.google.gson.Gson;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class HelloWorldServlet extends HttpServlet {
    final static Logger logger = Logger.getLogger(HelloWorldServlet.class);
    private static final long serialVersionUID = 1L;

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        doGet(request, response);
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        MessageResponse res = new MessageResponse();
        res.setResponse("Hello World!");

        String resJson = new Gson().toJson(res);
        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(200);

        logger.info("Response: " + resJson);
        out.print(new Gson().toJson(res));
        out.flush();
    }


}
