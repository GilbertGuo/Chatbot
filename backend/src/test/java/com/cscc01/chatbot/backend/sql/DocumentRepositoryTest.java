package com.cscc01.chatbot.backend.sql;

import static org.junit.Assert.assertEquals;

import javax.annotation.Resource;

import com.cscc01.chatbot.backend.model.Document;
import com.cscc01.chatbot.backend.sql.repositories.DocumentRepository;

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
public class DocumentRepositoryTest {
     
    @Resource
    private DocumentRepository documentRepository;
     
    @Test
    public void givenDocument_whenSave_thenGetOk() {
        Document document1 = new Document("testdoc");
        documentRepository.save(document1);
        Document document2 = documentRepository.findByName("testdoc");
        assertEquals("testdoc", document2.getName());
    }
}
