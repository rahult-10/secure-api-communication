# Secure API Communication System

A full-stack application demonstrating encrypted request-response communication between a React frontend and a Spring Boot backend using AES-256-GCM encryption.

## Overview

This project demonstrates how sensitive application data can be encrypted before processing and how encrypted responses can be securely handled through REST APIs.

The backend decrypts incoming data, performs business processing, encrypts the result, and returns the encrypted response to the frontend.

## Features

- AES-256-GCM encryption and decryption
- Random Initialization Vector (IV) generation
- Base64 encoding for encrypted data transport
- REST API integration using Spring Boot
- React-based user interface
- Separate controller, service, and utility layers
- Request processing and encrypted response handling

## Tech Stack

**Frontend**
- React
- JavaScript
- HTML and CSS

**Backend**
- Java
- Spring Boot
- REST APIs

**Cryptography**
- AES-256-GCM
- Java Cryptography Architecture (JCA)
- Base64 encoding

## Application Architecture

```text
React Frontend
      |
      | Enter message
      v
Spring Boot API
      |
      v
Encrypt Request
      |
      v
Encrypted Request
      |
      v
Backend Decryption
      |
      v
Business Processing
      |
      v
Encrypt Response
      |
      v
Encrypted Response
      |
      v
Backend Decryption
      |
      v
Display Plaintext Result
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/test-encrypt` | Encrypts the input message for testing |
| POST | `/api/encrypt` | Decrypts the request, processes the data, and encrypts the result |
| POST | `/api/decrypt` | Decrypts the encrypted response |

### Example Request

```json
{
  "encryptedData": "your-encrypted-base64-data"
}
```

### Example Response

```json
{
  "encryptedData": "your-encrypted-base64-data"
}
```

The `/api/decrypt` endpoint returns the plaintext value in the same response field in the current implementation.

## Project Structure

```text
secure-api-communication/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
├── src/
│   └── main/
│       └── java/
│           └── com/example/sabpee/
│               ├── controller/
│               ├── service/
│               ├── util/
│               └── dto/
├── pom.xml
├── .gitignore
└── README.md
```

*Adjust the backend paths above if your Spring Boot project is stored in a separate directory.*

## Getting Started

### Prerequisites

- Java and Maven
- Node.js and npm
- A running Spring Boot backend

### 1. Start the Backend

Navigate to the directory containing `pom.xml` and run:

```bash
mvn spring-boot:run
```

The backend should start on:

`http://localhost:8080`

### 2. Start the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, typically:

`http://localhost:5173`

### 3. Test the Application

1. Enter a message in the React interface.
2. Click **Encrypt & Send**.
3. Click **Process Request**.
4. Click **Decrypt Response**.
5. Verify that the original message is displayed.

## Security Considerations

- AES-GCM provides confidentiality and authentication of encrypted data.
- A fresh 12-byte IV is generated for each encryption operation.
- Base64 is an encoding format, not an encryption algorithm.
- The AES key must be stored securely outside the source code.
- HTTPS/TLS should be used in deployed environments.
- This project is a learning prototype and is not intended for production use without additional security controls.

## Future Improvements

- Secure key management using environment variables or a secrets manager
- Centralized exception handling and request validation
- Automated unit and integration tests
- API documentation using OpenAPI/Swagger
- Backend health monitoring

## Author

Developed as a full-stack learning project to explore application-level encryption, REST API communication, and layered Spring Boot architecture.
