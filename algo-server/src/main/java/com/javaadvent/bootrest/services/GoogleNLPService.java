package com.javaadvent.bootrest.services;



import com.google.cloud.language.spi.v1beta2.LanguageServiceClient;


import com.google.cloud.language.v1beta2.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by or.l on 6/4/17.
 */
public class GoogleNLPService implements NLPService {

    //export GOOGLE_APPLICATION_CREDENTIALS=/Users/or.l/IdeaProjects/myproject/dont-forget/algo-server/src/main/resources/google_nlp_service_account.json
    private LanguageServiceClient languageServiceClient;

    public GoogleNLPService(LanguageServiceClient languageServiceClient){
        this.languageServiceClient = languageServiceClient;
    }

    @Override
    public List<String> getTextEntities(String text){
        List<Entity> entities = analyzeTextEntities(text);

         return entities.stream().map(entity -> entity.getName()).collect(Collectors.toList());

    }

    public List<Entity> analyzeTextEntities(String text) {
        Document doc = Document.newBuilder()
                .setContent(text).setType(Document.Type.PLAIN_TEXT).build();
        AnalyzeEntitiesRequest request = AnalyzeEntitiesRequest.newBuilder()
                .setDocument(doc)
                .setEncodingType(EncodingType.UTF16).build();
        AnalyzeEntitiesResponse response = languageServiceClient.analyzeEntities(request);
        return response.getEntitiesList();
    }


    public Sentiment analyzeSentimentText(String text){
        Document doc = Document.newBuilder()
                .setContent(text).setType(Document.Type.PLAIN_TEXT).build();
        AnalyzeSentimentResponse response = languageServiceClient.analyzeSentiment(doc);
        return response.getDocumentSentiment();
    }
}