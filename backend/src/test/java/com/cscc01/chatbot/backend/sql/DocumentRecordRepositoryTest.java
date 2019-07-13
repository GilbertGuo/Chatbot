package com.cscc01.chatbot.backend.sql;

import static org.junit.Assert.assertEquals;

import javax.annotation.Resource;

import com.cscc01.chatbot.backend.model.DocumentRecord;
import com.cscc01.chatbot.backend.sql.repositories.DocumentRecordRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(
        classes = {DatabaseConfiguration.class},
        loader = AnnotationConfigContextLoader.class)
@Transactional
public class DocumentRecordRepositoryTest {

    @Resource
    private DocumentRecordRepository documentRepository;

    @Test
    public void givenDocument_whenSave_thenGetOk() {
        DocumentRecord documentRecord1 = new DocumentRecord("testdoc");
        documentRecord1.setLastModified("2018-09-07");
        documentRepository.save(documentRecord1);
        DocumentRecord documentRecord2 = documentRepository.findByName("testdoc");
        assertEquals("testdoc", documentRecord2.getName());
        assertEquals("2018-09-07", documentRecord2.getLastModified());
        List<DocumentRecord> d = documentRepository.findAll();
        assertEquals(1, d.size());
    }
}
