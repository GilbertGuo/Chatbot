package com.cscc01.chatbot.backend.indexer;

import com.cscc01.chatbot.backend.indexer.exception.FileTypeNotSupportedException;
import com.cscc01.chatbot.backend.indexer.exception.IndexAlreadyExistedException;
import org.apache.lucene.analysis.en.EnglishAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.index.*;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.*;
import org.apache.tika.exception.TikaException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.xml.sax.SAXException;

import javax.inject.Inject;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Component
public class Indexer {

    private final Logger LOGGER = LoggerFactory.getLogger(Indexer.class);

    @Inject
    private DocumentRetriever documentRetriever;

    @Inject
    private IndexerComponentFactory indexerComponentFactory;

    @Inject
    private FileValidator fileValidator;


    public void createIndex(String filePath)
            throws IOException, FileTypeNotSupportedException,
            TikaException, SAXException, IndexAlreadyExistedException {
        Path path = Paths.get(filePath);
        File file = path.toFile();

        IndexWriter indexWriter = indexerComponentFactory.getIndexWriter();
        IndexSearcher indexSearcher = indexerComponentFactory.getIndexSearcher();
        TopDocs results = indexSearcher.search(new TermQuery(
                new Term(LuceneFieldConstants.FILE_NAME.getText(), file.getName())), 1);

        if(results.totalHits.value != 0) {
            throw new IndexAlreadyExistedException(file.getName());
        }
        LOGGER.info("Opening file " + filePath + "to create index");

        if (fileValidator.isPDF(file)) {
            Document document = documentRetriever.getPdfDocument(file);
            indexWriter.addDocument(document);
        }
        if (fileValidator.isValidFile(file)) {
            Document document = documentRetriever.getDocument(file);
            indexWriter.addDocument(document);
        }
        indexWriter.commit();
        LOGGER.info("Document" + file.getName() + " added successfully");
    }

    public void deleteDocument(Term term) throws IOException {
        IndexWriter indexWriter = indexerComponentFactory.getIndexWriter();
        indexWriter.deleteDocuments(term);
        indexWriter.close();
    }

    public List<Document> searchIndex(Query query) throws IOException {
        List<Document> result = new ArrayList<>();
        return getResult(query, result);
    }


    public List<Document> search(LuceneFieldConstants fieldConstant, String queryString)
            throws IOException, ParseException {
        List<Document> result = new ArrayList<>();
        Query query = new QueryParser(fieldConstant.getText(), new EnglishAnalyzer()).parse(queryString);

        return getResult(query, result);
    }

    private List<Document> getResult(Query query, List<Document> result) throws IOException {
        IndexSearcher indexSearcher = indexerComponentFactory.getIndexSearcher();
        TopDocs topDocs = indexSearcher.search(query, 10);
        LOGGER.info("Finished search query " + query.toString() + ",\n Total Hits " + topDocs.totalHits);
        for (ScoreDoc scoreDoc : topDocs.scoreDocs) {
            result.add(indexSearcher.doc(scoreDoc.doc));
        }
        return result;
    }
}
