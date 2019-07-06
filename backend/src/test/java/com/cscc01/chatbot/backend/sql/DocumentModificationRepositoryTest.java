package com.cscc01.chatbot.backend.sql;

import static org.junit.Assert.assertEquals;

import javax.annotation.Resource;

import com.cscc01.chatbot.backend.model.DocumentModification;
import com.cscc01.chatbot.backend.sql.repositories.DocumentModificationRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.annotation.PropertySource;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;
import org.springframework.transaction.annotation.Transactional;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(
  classes = { DatabaseConfiguration.class }, 
  loader = AnnotationConfigContextLoader.class)
@Transactional
public class DocumentModificationRepositoryTest {
     
    @Resource
    private DocumentModificationRepository documentModificationRepository;
     
    @Test
    public void givenDocumentModification_whenSave_thenGetOk() {
        long documentId = 1L;
        DocumentModification documentModification1 = new DocumentModification(documentId, "admin", "2019-07-04");
        documentModificationRepository.save(documentModification1);
        DocumentModification documentModification2 = documentModificationRepository.findByModifiedUser("admin");
        assertEquals(documentId, documentModification2.getDocumentId());
        assertEquals("admin", documentModification2.getModifiedUser());
        assertEquals("2019-07-04", documentModification2.getModifiedTime());
    }
}
