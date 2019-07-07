package com.cscc01.chatbot.backend.crawler;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import edu.uci.ics.crawler4j.crawler.Page;
import edu.uci.ics.crawler4j.crawler.WebCrawler;
import edu.uci.ics.crawler4j.parser.HtmlParseData;
import edu.uci.ics.crawler4j.url.WebURL;

public class Crawler extends WebCrawler {
    private static final Logger LOGGER = LoggerFactory.getLogger(Crawler.class);
    private Map<CrawlerResultKey, String> result;
    /**
     * You should implement this function to specify whether the given url
     * should be crawled or not (based on your crawling logic).
     */
    @Override
    public boolean shouldVisit(Page referringPage, WebURL url) {
        String href = url.getURL().toLowerCase();
        // Ignore the url if it has an extension that matches our defined filters.
        if (CrawlerConfiguration.FILTERS.matcher(href).matches()) {
            return false;
        }

        // Only accept the url if it is in the "www.utsc.utoronto.ca" domain and protocol is "https".
        return true;
    }

    /**
     * This function is called when a page is fetched and ready to be processed
     * by your program.
     */
    @Override
    public void visit(Page page) {
        String url = page.getWebURL().getURL();
        LOGGER.info("URL: {}", url);

        if (page.getParseData() instanceof HtmlParseData) {
            HtmlParseData htmlParseData = (HtmlParseData) page.getParseData();

            String text = htmlParseData.getText();
            String html = htmlParseData.getHtml();
            String title = htmlParseData.getTitle()
                    ;
            result = new HashMap<>();
            result.put(CrawlerResultKey.TITLE, title);
            result.put(CrawlerResultKey.CONTENT, text);
            result.put(CrawlerResultKey.HTML, html);
            result.put(CrawlerResultKey.URL, url);

            Set<WebURL> links = htmlParseData.getOutgoingUrls();

            // Need to add further parsing steps
            // htmlParseData.getText() is available to user for convenience 
            // jsoup should be added for more precise parsing
            // crawler4j is only used for scheduling
            LOGGER.debug("Text : {}", text);
            LOGGER.debug("Text length: {}", text.length());
            LOGGER.debug("Html length: {}", html.length());
        }
    }

    public Map<CrawlerResultKey, String> getResult(){
        return result;
    }
}
