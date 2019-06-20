package com.cscc01.chatbot.backend.indexer;

import org.apache.lucene.analysis.en.EnglishAnalyzer;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.store.FSDirectory;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Paths;

@Component
public class IndexerComponentFactory {
    private FSDirectory indexDirectory;
    private IndexWriter indexWriter;
    private IndexReader indexReader;
    private IndexSearcher indexSearcher;


    private final String INDEX_DIR_PATH = "./indexBase";

    public IndexWriter getIndexWriter() throws IOException {
        if (indexWriter != null && indexWriter.isOpen()) {
            return indexWriter;
        }
        IndexWriterConfig indexWriterConfig = new IndexWriterConfig(new EnglishAnalyzer());
        indexDirectory = FSDirectory.open(Paths.get(INDEX_DIR_PATH));
        indexWriter = new IndexWriter(indexDirectory, indexWriterConfig);

        return indexWriter;
    }

    public IndexSearcher getIndexSearcher() throws IOException {
        indexReader = DirectoryReader.open(indexDirectory);
        indexSearcher = new IndexSearcher(indexReader);
        return indexSearcher;
    }

}
