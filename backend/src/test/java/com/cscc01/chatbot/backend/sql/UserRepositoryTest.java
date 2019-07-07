package com.cscc01.chatbot.backend.sql;

import static org.junit.Assert.assertEquals;

import javax.annotation.Resource;

import com.cscc01.chatbot.backend.model.User;
import com.cscc01.chatbot.backend.sql.repositories.UserRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;
import org.springframework.transaction.annotation.Transactional;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(
  classes = { DatabaseConfiguration.class }, 
  loader = AnnotationConfigContextLoader.class)
@Transactional
public class UserRepositoryTest {
     
    @Resource
    private UserRepository userRepository;
     
    @Test
    public void givenUser_whenSave_thenGetOk() {
        User user1 = new User("test", "12345");
        userRepository.save(user1);
         
        User user2 = userRepository.findByUsername("test");
        assertEquals("test", user2.getName());
        assertEquals("12345", user2.getPassword());
    }
}
