package com.cscc01.chatbot.backend.servlet;

import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.http.HttpServlet;

@Configuration
public class ServletConfig {
    @Bean
    public ServletRegistrationBean<HttpServlet> countryServlet() {
        ServletRegistrationBean<HttpServlet> servletRegisterBean = new ServletRegistrationBean<>();
        servletRegisterBean.setServlet(new HelloWorldServlet());
        servletRegisterBean.addUrlMappings("/helloworld");
        servletRegisterBean.setLoadOnStartup(1);
        return servletRegisterBean;
    }

}
