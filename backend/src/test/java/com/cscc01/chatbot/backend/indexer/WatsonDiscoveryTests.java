package com.cscc01.chatbot.backend.indexer;


import com.ibm.watson.discovery.v1.model.DocumentStatus;
import com.ibm.watson.discovery.v1.model.QueryResponse;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RunWith(SpringRunner.class)
@SpringBootTest
public class WatsonDiscoveryTests {

    @Autowired
    private WatsonDiscovery watsonDiscovery;

    private File resourcesDirectory = new File("src/main/resources");

    @Test
    public void testUploadHtmlFile() throws IOException {
        Path path = Paths.get(resourcesDirectory.getAbsolutePath() + "/test/Index.html");
        File file = path.toFile();
        watsonDiscovery.addDocument(file, "0");
        watsonDiscovery.checkDocument("0");
        Assert.assertEquals(DocumentStatus.Status.AVAILABLE, watsonDiscovery.getDocumentStatus("0").getStatus());
    }

    @Test
    public void testDeleteUploadedHtmlFile() throws IOException {
        Path path = Paths.get(resourcesDirectory.getAbsolutePath() + "/test/Index.html");
        File file = path.toFile();
        watsonDiscovery.addDocument(file, "0");
        watsonDiscovery.checkDocument("0");
        Assert.assertEquals(DocumentStatus.Status.AVAILABLE, watsonDiscovery.getDocumentStatus("0").getStatus());
        watsonDiscovery.deleteDocument("0");
    }

    @Test
    public void testQueryHtmlFile() {
        QueryResponse result = watsonDiscovery.query("Can you show me what is index?");
        Assert.assertEquals("Index - Wikipedia", result.getResults().get(0).getTitle());
    }


}