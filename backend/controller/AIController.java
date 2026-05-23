package com.example.backend.controller;

import com.example.backend.dto.AIRequest;
import com.example.backend.service.AIService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/assist")
    public Map<String, String> assist(
            @RequestBody AIRequest request
    ) {

        String result = aiService.process(request);

        return Map.of(
                "result",
                result
        );
    }
}