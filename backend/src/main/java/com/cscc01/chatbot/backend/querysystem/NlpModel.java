package com.cscc01.chatbot.backend.querysystem;

import opennlp.tools.chunker.ChunkerModel;
import opennlp.tools.parser.ParserModel;
import opennlp.tools.postag.POSModel;
import opennlp.tools.sentdetect.SentenceModel;
import opennlp.tools.tokenize.TokenizerModel;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;

@Component
class NlpModel {

    private final File SENTENCE_MODEL = new File("src/main/resources/nlpModels/en-sent.bin");
    private final File CHUNKER_MODEL = new File("src/main/resources/nlpModels/en-chunker.bin");
    private final File TOKENIZER_MODEL = new File("src/main/resources/nlpModels/en-token.bin");
    private final File POSTAGGER_MODEL = new File("src/main/resources/nlpModels/en-pos-maxent.bin");
    private final File PARSER_MODEL = new File("src/main/resources/nlpModels/en-parser-chunking.bin");

    SentenceModel sentenceModel;
    TokenizerModel tokenizerModel;
    POSModel posModel;
    ChunkerModel chunkerModel;
    ParserModel parserModel;

    public NlpModel() throws IOException {
        sentenceModel = new SentenceModel(SENTENCE_MODEL);
        tokenizerModel = new TokenizerModel(TOKENIZER_MODEL);
        posModel = new POSModel(POSTAGGER_MODEL);
        chunkerModel = new ChunkerModel(CHUNKER_MODEL);
        parserModel = new ParserModel(PARSER_MODEL);
    }
}
