package com.cscc01.chatbot.backend.crawler;

import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.regex.Pattern;

import edu.uci.ics.crawler4j.crawler.Page;
import edu.uci.ics.crawler4j.crawler.WebCrawler;
import edu.uci.ics.crawler4j.parser.HtmlParseData;
import edu.uci.ics.crawler4j.url.WebURL;

public class BasicCrawler extends WebCrawler {

    private static final Pattern FILTERS = Pattern.compile(
        ".*(\\.(css|js|bmp|gif|jpe?g|png|tiff?|mid|mp2|mp3|mp4|wav|avi|mov|mpeg|ram|m4v|pdf" +
        "|rm|smil|wmv|swf|wma|zip|rar|gz))$");
    private final AtomicInteger numSeenFiltered;

    /**
     * Creates a new crawler instance.
     *
     * @param numSeenFiltered This is just an example to demonstrate how you can pass objects to crawlers. 
     */
    public BasicCrawler(AtomicInteger numSeenFiltered) {
        this.numSeenFiltered = numSeenFiltered;
    }

    /**
     * You should implement this function to specify whether the given url
     * should be crawled or not (based on your crawling logic).
     */
    @Override
    public boolean shouldVisit(Page referringPage, WebURL url) {
        String href = url.getURL().toLowerCase();
        // Ignore the url if it has an extension that matches our defined filters.
        if (FILTERS.matcher(href).matches()) {
            numSeenFiltered.incrementAndGet();
            return false;
        }

        // Only accept the url if it is in the "www.utsc.utoronto.ca" domain and protocol is "https".
        return href.startsWith("https://www.utsc.utoronto.ca/");
    }

    /**
     * This function is called when a page is fetched and ready to be processed
     * by your program.
     */
    @Override
    public void visit(Page page) {
        String url = page.getWebURL().getURL();
        logger.info("URL: {}", url);

        if (page.getParseData() instanceof HtmlParseData) {
            HtmlParseData htmlParseData = (HtmlParseData) page.getParseData();
            String text = htmlParseData.getText();
            String html = htmlParseData.getHtml();
            Set<WebURL> links = htmlParseData.getOutgoingUrls();

            // Need to add further parsing steps
            // htmlParseData.getText() is available to user for convenience 
            // jsoup should be added for more precise parsing
            // crawler4j is only used for scheduling
            logger.debug("Text : {}", text);
            logger.debug("Text length: {}", text.length());
            logger.debug("Html length: {}", html.length());
            logger.debug("Number of outgoing links: {}", links.size());
        }

        logger.debug("=============");
    }
}
