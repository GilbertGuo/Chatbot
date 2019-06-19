package com.cscc01.chatbot.backend.servelet;

import com.cscc01.chatbot.backend.model.MessageResponse;
import com.cscc01.chatbot.backend.servlet.HelloWorldServlet;
import com.google.gson.Gson;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ServeletTests {

    @Test
    public void testSimpleHelloWorldRequest() throws IOException {
        HelloWorldServlet servlet = new HelloWorldServlet();
        HttpServletRequest mockRequest = mock(HttpServletRequest.class);
        HttpServletResponse mockResponse = mock(HttpServletResponse.class);

        StringWriter out = new StringWriter();
        PrintWriter printOut = new PrintWriter(out);
        when(mockResponse.getWriter()).thenReturn(printOut);

        servlet.doGet(mockRequest, mockResponse);

        verify(mockResponse).setStatus(200);
        MessageResponse responseMsg = new Gson().fromJson(out.toString(), MessageResponse.class);
        assertEquals("Hello World!", responseMsg.getResponse());
    }
}
