package com.cscc01.chatbot.backend.querysystem;

import com.cscc01.chatbot.backend.indexer.Indexer;
import com.ibm.watson.natural_language_understanding.v1.model.AnalysisResults;
import org.apache.lucene.document.Document;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.search.Query;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.io.IOException;
import java.util.List;

@Service
public class QuerySystemProcessor {

    @Inject
    NauturalLanguageProcessService nauturalLanguageProcessService;

    @Inject
    Indexer indexer;

    public List<Document> process(String text) throws ParseException, IOException {
        AnalysisResults results = nauturalLanguageProcessService.analyzeKeyWords(text);
        Query query = QueryTranslator.fromKeyword(nauturalLanguageProcessService.sortResultByRelevance(results));
        List<Document> result = indexer.searchByQuery(query);
        return result;
    }
}
