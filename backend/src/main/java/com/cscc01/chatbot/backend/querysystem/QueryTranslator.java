package com.cscc01.chatbot.backend.querysystem;

import com.cscc01.chatbot.backend.indexer.LuceneFieldConstants;
import com.ibm.watson.natural_language_understanding.v1.model.KeywordsResult;
import org.apache.lucene.analysis.en.EnglishAnalyzer;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.Query;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

public class QueryTranslator {

    public static Query fromKeyword(List<KeywordsResult> keywordsResults) throws ParseException {
        StringBuilder queryStringBuilder = new StringBuilder();
        for (KeywordsResult keywordsResult : keywordsResults) {
            queryStringBuilder.append(" " +keywordsResult.getText());
        }
        Query query = new QueryParser(LuceneFieldConstants.CONTENT.getText(),
                new EnglishAnalyzer()).parse(queryStringBuilder.toString());
        return query;
    }

    public static Query fromMap(Map<String, Integer> keywords) throws ParseException {
        StringBuilder queryStringBuilder = new StringBuilder();
        keywords.forEach((keyword, frequency) -> {
            queryStringBuilder.append(keyword + " ");
        });
        Query query = new QueryParser(LuceneFieldConstants.CONTENT.getText(),
                new EnglishAnalyzer()).parse(queryStringBuilder.toString());
        return query;
    }
}
