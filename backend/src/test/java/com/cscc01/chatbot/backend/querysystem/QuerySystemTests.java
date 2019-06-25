package com.cscc01.chatbot.backend.querysystem;


import com.cscc01.chatbot.backend.indexer.Indexer;
import com.cscc01.chatbot.backend.indexer.LuceneFieldConstants;
import com.ibm.watson.natural_language_understanding.v1.model.AnalysisResults;
import org.apache.lucene.index.Term;
import org.apache.lucene.search.Query;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.inject.Inject;
import java.io.File;
import java.io.IOException;

@RunWith(SpringRunner.class)
@SpringBootTest
public class QuerySystemTests {


    @Inject
    Indexer indexer;

    @Inject
    private QueryAnalyzer queryAnalyzer;

    @Inject
    NauturalLanguageProcessService nauturalLanguageProcessService;

    private File resourcesDirectory = new File("src/main/resources");

    @Before
    @After
    public void rollback() throws IOException {
        Term term = new Term(LuceneFieldConstants.FILE_NAME.getText(), "Index.html");
        indexer.deleteDocument(term);
        Term term1 = new Term(LuceneFieldConstants.FILE_NAME.getText(), "test.txt");
        indexer.deleteDocument(term1);
        Term term2 = new Term(LuceneFieldConstants.FILE_NAME.getText(), "ChatBotProject.pdf");
        indexer.deleteDocument(term2);
        Term term3 = new Term(LuceneFieldConstants.FILE_NAME.getText(), "crawler.doc");
        indexer.deleteDocument(term3);
        Term term4 = new Term(LuceneFieldConstants.FILE_NAME.getText(), "crawler.docx");
        indexer.deleteDocument(term4);
        Term term5 = new Term(LuceneFieldConstants.FILE_NAME.getText(), "Index.txt");
        indexer.deleteDocument(term5);
        Term term6 = new Term(LuceneFieldConstants.FILE_NAME.getText(), "Index.pdf");
        indexer.deleteDocument(term6);
    }

    @Test
    public void testKeywordExtraction() throws Exception {
        indexer.createIndex(resourcesDirectory.getAbsolutePath() + "/test/Index.pdf");
        indexer.createIndex(resourcesDirectory.getAbsolutePath() + "/test/Index.html");
        indexer.createIndex(resourcesDirectory.getAbsolutePath() + "/test/Index.txt");
        indexer.createIndex(resourcesDirectory.getAbsolutePath() + "/test/test.txt");
        indexer.createIndex(resourcesDirectory.getAbsolutePath() + "/test/crawler.doc");
        indexer.createIndex(resourcesDirectory.getAbsolutePath() + "/test/ChatBotProject.pdf");
        String text = "How to upload files in crawler";
        AnalysisResults results = nauturalLanguageProcessService.analyzeKeyWords(text);
        Query query = QueryTranslator.fromKeyword(nauturalLanguageProcessService.sortResultByRelevance(results));

        Assert.assertEquals("crawler.doc", indexer.searchByQuery(query).get(0).get("filename"));
    }


    @Test
    public void testKeywordExtraction2() throws Exception {
        indexer.createIndex(resourcesDirectory.getAbsolutePath() + "/test/Index.pdf");
        indexer.createIndex(resourcesDirectory.getAbsolutePath() + "/test/Index.html");
        indexer.createIndex(resourcesDirectory.getAbsolutePath() + "/test/Index.txt");
        indexer.createIndex(resourcesDirectory.getAbsolutePath() + "/test/test.txt");
        indexer.createIndex(resourcesDirectory.getAbsolutePath() + "/test/crawler.doc");
        indexer.createIndex(resourcesDirectory.getAbsolutePath() + "/test/ChatBotProject.pdf");
        String text = "What is advisor in chatbot project?";
        AnalysisResults results = nauturalLanguageProcessService.analyzeKeyWords(text);
        Query query = QueryTranslator.fromKeyword(nauturalLanguageProcessService.sortResultByRelevance(results));

        Assert.assertEquals("ChatBotProject.pdf.doc", indexer.searchByQuery(query).get(0).get("filename"));
    }
}
