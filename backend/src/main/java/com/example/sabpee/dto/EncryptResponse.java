package com.example.sabpee.dto;

public class EncryptResponse {

    public String encryptedData;

    public EncryptResponse(){

    }

    public String getEncryptedData(){
        return encryptedData;
    }

    public EncryptResponse(String encryptedData){
        this.encryptedData = encryptedData;
    }

    public void setEncryptedData(String encryptedData) {
        this.encryptedData = encryptedData;
    }
}
