package com.example.sabpee.dto;

public class EncryptRequest {

    public String encryptedData;

    public EncryptRequest(){
    }

    public String getEncryptedData(){
        return encryptedData;
    }

    public void setEncryptData(String encryptedData){
        this.encryptedData = encryptedData;
    }
}
