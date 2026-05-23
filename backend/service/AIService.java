package com.example.backend.service;

import com.example.backend.dto.AIRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class AIService {

    @Value("${openai.api.key}")
    private String apiKey;

    public String process(AIRequest request) {

        String prompt = switch (request.getAction()) {

            case "summarize" ->
                    "Summarize this note:\n" + request.getText();

            case "improve" ->
                    "Improve this writing:\n" + request.getText();

            case "continue" ->
                    "Continue writing:\n" + request.getText();

            case "translate" ->
                    "Translate this into English:\n" + request.getText();

            default -> request.getText();
        };

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();

        headers.setBearerAuth(apiKey);

        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();

        body.put("model", "gpt-4o-mini");

        List<Map<String, String>> messages = List.of(
                Map.of(
                        "role", "user",
                        "content", prompt
                )
        );

        body.put("messages", messages);

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(body, headers);

        ResponseEntity<Map> response =
                restTemplate.exchange(
                        "https://api.openai.com/v1/chat/completions",
                        HttpMethod.POST,
                        entity,
                        Map.class
                );

        List<Map<String, Object>> choices =
                (List<Map<String, Object>>)
                        response.getBody().get("choices");

        Map<String, Object> message =
                (Map<String, Object>)
                        choices.get(0).get("message");

        return message.get("content").toString();
    }
}