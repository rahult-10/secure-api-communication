package com.example.sabpee.service;

import com.example.sabpee.util.EncryptUtil;
import org.springframework.stereotype.Service;

@Service
public class EncryptService {

    public String processEncryptData(String encryptData) throws Exception {

        String decryptData = EncryptUtil.decrypt(encryptData);

        String processData = processData(decryptData);

        return EncryptUtil.encrypt(processData);
    }

    public String decryptData(String encryptData) throws Exception {
        return EncryptUtil.decrypt(encryptData);
    }

    private String processData(String data){
        return data;
    }
}
