package com.cscc01.chatbot.backend.indexer;

import com.cscc01.chatbot.backend.indexer.exception.FileTypeNotSupportedException;
import org.apache.tika.Tika;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.HashSet;

@Component
public class FileValidator {
    private static final Logger LOGGER = LoggerFactory.getLogger(FileValidator.class);

    private HashSet<String> SUPPORTED_FILE_TYPE = new HashSet<>();

    public FileValidator() {
        SUPPORTED_FILE_TYPE.add("application/pdf");
        SUPPORTED_FILE_TYPE.add("text/html");
        SUPPORTED_FILE_TYPE.add("text/plain");
        SUPPORTED_FILE_TYPE.add("application/msword");
        SUPPORTED_FILE_TYPE.add("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    }

    public boolean isValidFile(File file) throws IOException, FileTypeNotSupportedException {
        Tika tika = new Tika();
        String fileType = tika.detect(file);
        if (SUPPORTED_FILE_TYPE.contains(fileType)) {
            return true;
        } else {
            throw new FileTypeNotSupportedException(fileType);
        }
    }

    public boolean isPDF(File file) throws IOException {
        return new Tika().detect(file).equals("application/pdf");
    }
}
