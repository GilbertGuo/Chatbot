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


    /**
     * Given a file path, index the file
     * @param filePath
     * @throws IOException
     * @throws FileTypeNotSupportedException
     * @throws TikaException
     * @throws SAXException
     * @throws IndexAlreadyExistedException
     */
    public void createIndex(String filePath)
            throws IOException, FileTypeNotSupportedException,
            TikaException, SAXException, IndexAlreadyExistedException {
        Path path = Paths.get(filePath);
        File file = path.toFile();

        IndexWriter indexWriter = indexerComponentFactory.getIndexWriter();
        IndexSearcher indexSearcher = indexerComponentFactory.getIndexSearcher();
        TopDocs results = indexSearcher.search(new TermQuery(
                new Term(LuceneFieldConstants.FILE_NAME.getText(), file.getName())), 1);

        if (results.totalHits.value != 0) {
            throw new IndexAlreadyExistedException(file.getName());
        }
        LOGGER.info("Opening file " + filePath + " to create index");

        if (fileValidator.isPDF(file)) {
            Document document = documentRetriever.getPdfDocument(file);
            indexWriter.addDocument(document);
        } else if (fileValidator.isDoc(file)) {
            Document document = documentRetriever.getDocDocument(file);
            indexWriter.addDocument(document);
        } else if (fileValidator.isValidFile(file)) {
            Document document = documentRetriever.getDocument(file);
            indexWriter.addDocument(document);
        }
        indexWriter.commit();
        LOGGER.info("Document " + file.getName() + " added successfully");
    }

    /**
     * delete a Document from indexes, should use field LuceneField filename to create the term,
     * otherwise you may delete the wrong document by mistake.
     * @param term
     * @throws IOException
     */
    public void deleteDocument(Term term) throws IOException {
        IndexWriter indexWriter = indexerComponentFactory.getIndexWriter();
        indexWriter.deleteDocuments(term);
        indexWriter.close();
    }


    /**
     * Search indexes given a LuceneField and queryString which contains keywords.
     * returns top 10 hitcount documents.
     * @param fieldConstant
     * @param queryString
     * @return
     * @throws IOException
     * @throws ParseException
     */
    public List<Document> search(LuceneFieldConstants fieldConstant, String queryString)
            throws IOException, ParseException {
        List<Document> result = new ArrayList<>();
        Query query = new QueryParser(fieldConstant.getText(), new EnglishAnalyzer()).parse(queryString);

        return getResult(query, result);
    }

    private List<Document> getResult(Query query, List<Document> result) throws IOException {
        IndexSearcher indexSearcher = indexerComponentFactory.getIndexSearcher();
        TopDocs topDocs = indexSearcher.search(query, 10);
        LOGGER.info("Finished search query " + query.toString() + "  Total Hits: " + topDocs.totalHits);
        for (ScoreDoc scoreDoc : topDocs.scoreDocs) {
            result.add(indexSearcher.doc(scoreDoc.doc));
        }
        return result;
    }
}
