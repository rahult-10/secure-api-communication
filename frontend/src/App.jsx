import { useState } from "react";
import "./App.css";

const API = "http://localhost:8080/api";

function App() {
  const [message, setMessage] = useState("");
  const [encryptedRequest, setEncryptedRequest] = useState("");
  const [encryptedResponse, setEncryptedResponse] = useState("");
  const [decryptedResponse, setDecryptedResponse] = useState("");

  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const encryptMessage = async () => {
    if (!message.trim()) {
      setError("Please enter a message first.");
      return;
    }

    try {
      setError("");
      setLoading("encrypt");

      const response = await fetch(`${API}/test-encrypt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          encryptedData: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Encryption failed");
      }

      const data = await response.json();
      setEncryptedRequest(data.encryptedData);
      setEncryptedResponse("");
      setDecryptedResponse("");
    } catch (err) {
      setError("Unable to connect to the backend.");
    } finally {
      setLoading("");
    }
  };

  const processMessage = async () => {
    if (!encryptedRequest) return;

    try {
      setError("");
      setLoading("process");

      const response = await fetch(`${API}/encrypt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          encryptedData: encryptedRequest,
        }),
      });

      if (!response.ok) {
        throw new Error("Processing failed");
      }

      const data = await response.json();
      setEncryptedResponse(data.encryptedData);
      setDecryptedResponse("");
    } catch (err) {
      setError("Unable to process the encrypted request.");
    } finally {
      setLoading("");
    }
  };

  const decryptMessage = async () => {
    if (!encryptedResponse) return;

    try {
      setError("");
      setLoading("decrypt");

      const response = await fetch(`${API}/decrypt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          encryptedData: encryptedResponse,
        }),
      });

      if (!response.ok) {
        throw new Error("Decryption failed");
      }

      const data = await response.json();
      setDecryptedResponse(data.encryptedData);
    } catch (err) {
      setError("Unable to decrypt the response.");
    } finally {
      setLoading("");
    }
  };

  const resetDemo = () => {
    setMessage("");
    setEncryptedRequest("");
    setEncryptedResponse("");
    setDecryptedResponse("");
    setError("");
  };

  return (
    <div className="app">

      {/* Header */}
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">🔐</div>

          <div>
            <h1>SecurePay</h1>
            <span>Encrypted Communication Console</span>
          </div>
        </div>

        <div className="backend-status">
          <span className="status-dot"></span>
          Backend Connected
        </div>
      </header>


      {/* Main */}
      <main className="main">

        <div className="page-heading">
          <div>
            <p className="eyebrow">SECURE TRANSACTION FLOW</p>
            <h2>Request & Response Encryption</h2>
            <p className="description">
              Securely transmit, process and decrypt application data.
            </p>
          </div>

          <button className="reset-btn" onClick={resetDemo}>
            Reset
          </button>
        </div>


        {/* Steps */}
        <div className="steps">

          <div className={`step ${message ? "active" : ""}`}>
            <span>1</span>
            <div>
              <strong>Request</strong>
              <small>Enter data</small>
            </div>
          </div>

          <div className="step-line"></div>

          <div className={`step ${encryptedRequest ? "active" : ""}`}>
            <span>2</span>
            <div>
              <strong>Encrypt</strong>
              <small>Secure payload</small>
            </div>
          </div>

          <div className="step-line"></div>

          <div className={`step ${encryptedResponse ? "active" : ""}`}>
            <span>3</span>
            <div>
              <strong>Process</strong>
              <small>Backend processing</small>
            </div>
          </div>

          <div className="step-line"></div>

          <div className={`step ${decryptedResponse ? "active" : ""}`}>
            <span>4</span>
            <div>
              <strong>Decrypt</strong>
              <small>Read response</small>
            </div>
          </div>

        </div>


        {/* Request Card */}
        <section className="card">

          <div className="card-header">
            <div className="card-title">
              <div className="number">01</div>

              <div>
                <h3>Request Data</h3>
                <p>Enter the message you want to send.</p>
              </div>
            </div>

            <span className="badge">PLAINTEXT</span>
          </div>

          <div className="input-wrapper">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Payment request"
            />
          </div>

          <button
            className="primary-btn"
            onClick={encryptMessage}
            disabled={loading === "encrypt"}
          >
            {loading === "encrypt" ? "Encrypting..." : "Encrypt & Send →"}
          </button>

        </section>


        {/* Encrypted Request */}
        <section className="card">

          <div className="card-header">
            <div className="card-title">
              <div className="number">02</div>

              <div>
                <h3>Encrypted Request</h3>
                <p>Payload sent securely to the backend.</p>
              </div>
            </div>

            <span className="badge secure">AES-GCM</span>
          </div>

          <div className="payload">
            {encryptedRequest || (
              <span className="placeholder">
                Encrypted payload will appear here...
              </span>
            )}
          </div>

          <button
            className="secondary-btn"
            onClick={processMessage}
            disabled={!encryptedRequest || loading === "process"}
          >
            {loading === "process" ? "Processing..." : "Process Request →"}
          </button>

        </section>


        {/* Encrypted Response */}
        <section className="card">

          <div className="card-header">
            <div className="card-title">
              <div className="number">03</div>

              <div>
                <h3>Encrypted Response</h3>
                <p>Encrypted result returned by the backend.</p>
              </div>
            </div>

            <span className="badge secure">ENCRYPTED</span>
          </div>

          <div className="payload">
            {encryptedResponse || (
              <span className="placeholder">
                Encrypted response will appear here...
              </span>
            )}
          </div>

          <button
            className="primary-btn"
            onClick={decryptMessage}
            disabled={!encryptedResponse || loading === "decrypt"}
          >
            {loading === "decrypt" ? "Decrypting..." : "Decrypt Response →"}
          </button>

        </section>


        {/* Result */}
        <section className="result-card">

          <div className="result-icon">✓</div>

          <div className="result-content">
            <span>DECRYPTED RESULT</span>

            <h3>
              {decryptedResponse || "Waiting for decrypted response..."}
            </h3>

            <p>
              The backend response has been successfully decrypted.
            </p>
          </div>

        </section>


        {/* Error */}
        {error && (
          <div className="error">
            ⚠ {error}
          </div>
        )}

      </main>


      {/* Footer */}
      <footer>
        <span>AES-256-GCM</span>
        <span>•</span>
        <span>Spring Boot API</span>
        <span>•</span>
        <span>React Client</span>
      </footer>

    </div>
  );
}

export default App;