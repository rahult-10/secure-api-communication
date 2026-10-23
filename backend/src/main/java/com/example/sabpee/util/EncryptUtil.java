package com.example.sabpee.util;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;

public class EncryptUtil {

    private static final String Algorithm = "AES/GCM/NoPadding";

    private static final byte[] SECRET_KEY =
            "12345678901234567890123456789012".getBytes(StandardCharsets.UTF_8);


    public static String encrypt(String data) throws Exception {
        byte[] iv = new byte[12];
        SecureRandom random = new SecureRandom();
        random.nextBytes(iv);

        Cipher cipher = Cipher.getInstance(Algorithm);

        SecretKeySpec key =
                new SecretKeySpec(SECRET_KEY, "AES");

        GCMParameterSpec parameterSpec =
                new GCMParameterSpec(128, iv);

        cipher.init(Cipher.ENCRYPT_MODE, key, parameterSpec);

        byte[] encrypted =
                cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));

        byte[] result = new byte[iv.length + encrypted.length];

        System.arraycopy(iv, 0, result, 0, iv.length);

        System.arraycopy(encrypted, 0, result, iv.length, encrypted.length
        );

        return Base64.getEncoder().encodeToString(result);
    }

    public static String decrypt(String encryptedData) throws Exception {

        byte[] decoded =
                Base64.getDecoder().decode(encryptedData);

        byte[] iv = new byte[12];

        System.arraycopy(decoded, 0, iv, 0, iv.length);

        byte[] encrypted =
                new byte[decoded.length - iv.length];

        System.arraycopy(decoded, iv.length, encrypted, 0, encrypted.length);

        Cipher cipher = Cipher.getInstance(Algorithm);

        SecretKeySpec key =
                new SecretKeySpec(SECRET_KEY, "AES");

        GCMParameterSpec parameterSpec =
                new GCMParameterSpec(128, iv);

        cipher.init(Cipher.DECRYPT_MODE, key, parameterSpec);

        byte[] decrypted =
                cipher.doFinal(encrypted);

        return new String(decrypted, StandardCharsets.UTF_8);
    }

}
