package com.cscc01.chatbot.backend.crawler;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


import static org.junit.Assert.assertTrue;


@RunWith(SpringRunner.class)
@SpringBootTest
public class CrawlerTests {

    @Autowired
    CrawlerService crawlerService;

    @Test
    public void testUTSCCrawler() throws Exception {
        String seedUrl = "https://www.utsc.utoronto.ca/home/";
        String scrapedResult = crawlerService.startCrawler(seedUrl);
        assertTrue(scrapedResult.contains("U of T"));
    }
}
