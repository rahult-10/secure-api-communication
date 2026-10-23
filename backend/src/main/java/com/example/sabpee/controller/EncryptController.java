package com.example.sabpee.controller;

import com.example.sabpee.dto.EncryptRequest;
import com.example.sabpee.dto.EncryptResponse;
import com.example.sabpee.service.EncryptService;
import com.example.sabpee.util.EncryptUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class EncryptController {

    private final EncryptService encryptService;


    public EncryptController(EncryptService encryptService) {
        this.encryptService = encryptService;
    }

    @PostMapping("/test-encrypt")
    public ResponseEntity<EncryptResponse> testEncrypt(@RequestBody EncryptRequest encryptRequest) throws Exception {

        String encryptedResponse = EncryptUtil.encrypt(encryptRequest.getEncryptedData()
                );

        return ResponseEntity.ok(
                new EncryptResponse(encryptedResponse)
        );
    }


    @PostMapping("/encrypt")
    public ResponseEntity<EncryptResponse> process (@RequestBody EncryptRequest encryptRequest) throws Exception {
        String encryptedResponse = encryptService.processEncryptData(encryptRequest.getEncryptedData());
        return ResponseEntity.ok(new EncryptResponse(encryptedResponse));
    }

    @PostMapping("/decrypt")
    public ResponseEntity<EncryptResponse> decrypt(@RequestBody EncryptRequest encryptRequest) throws Exception {
        String decryptResponse = encryptService.decryptData(encryptRequest.getEncryptedData());
        return ResponseEntity.ok(new EncryptResponse(decryptResponse));
    }
}
