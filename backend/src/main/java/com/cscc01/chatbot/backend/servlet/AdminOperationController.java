package com.cscc01.chatbot.backend.servlet;

import com.cscc01.chatbot.backend.crawler.CrawlerResultKey;
import com.cscc01.chatbot.backend.crawler.CrawlerService;
import com.cscc01.chatbot.backend.indexer.Indexer;
import com.cscc01.chatbot.backend.indexer.exception.FileTypeNotSupportedException;
import com.cscc01.chatbot.backend.model.DocumentDeleteRequest;
import com.cscc01.chatbot.backend.model.UrlUploadRequest;
import com.cscc01.chatbot.backend.sql.repositories.DocumentRecordRepository;
import org.apache.tika.exception.TikaException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.xml.sax.SAXException;

import javax.inject.Inject;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@CrossOrigin
@RestController
@RequestMapping("/")
public class AdminOperationController {
    private final Logger LOGGER = LoggerFactory.getLogger(AdminOperationController.class);
    private String tempDir = System.getProperty("java.io.tmpdir");


    @Inject
    private Indexer indexer;

    @Inject
    private CrawlerService crawlerService;

    @Inject
    private DocumentRecordRepository documentRecordRepository;

    @PreAuthorize("hasAuthority('ADMIN')")
    @RequestMapping(value = "/api/v1/documents/files", method = RequestMethod.POST, consumes = {"multipart/form-data"})
    public Map<String, Object> uploadFileDocument(@RequestParam("file") MultipartFile file)
            throws IOException, TikaException, SAXException {
        LOGGER.info("Receive upload document: " + file.getOriginalFilename()
                + "\nType : " + file.getContentType()
                + "\nSize : " + file.getSize());
        String tempPath = tempDir + "/" + file.getOriginalFilename();
        File receivedFile = new File(tempPath);
        file.transferTo(receivedFile);
        try {
            indexer.createIndex(receivedFile);
        } catch (FileTypeNotSupportedException f) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "File type is not supported", f);

        }
        receivedFile.deleteOnExit();
        Map<String, Object> response = new HashMap<>();
        response.put("filename", receivedFile.getName());
        return response;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @RequestMapping(value = "/api/v1/documents/urls", method = RequestMethod.POST)
    public Map<String, Object> uploadUrlDocument(@RequestBody UrlUploadRequest urlUploadRequest) throws Exception {
        Map<CrawlerResultKey, String> crawlerResultKeyStringMap = crawlerService.startCrawler(urlUploadRequest.getUrl());
        System.out.println(crawlerResultKeyStringMap.get(CrawlerResultKey.CONTENT));
        indexer.createIndex(crawlerResultKeyStringMap);
        Map<String, Object> response = new HashMap<>();
        response.put("filename", crawlerResultKeyStringMap.get(CrawlerResultKey.TITLE));
        return response;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @RequestMapping(value = "/api/v1/documents", method = RequestMethod.DELETE)
    public void deleteDocument(@RequestBody DocumentDeleteRequest documentDeleteRequest) throws IOException {
        indexer.deleteDocument(documentDeleteRequest.getFilename());
        LOGGER.info(documentDeleteRequest.getFilename());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @RequestMapping(value = "/api/v1/documents", method = RequestMethod.GET)
    public Map<String, Object> getDocuments() {
        Map<String, Object> response = new HashMap<>();
        response.put("documents", documentRecordRepository.findAll());
        return response;
    }


}
