import { useEffect, useState } from "react";
import "./App.css";

// This makes the 'google' object available to TypeScript
declare global {
  interface Window {
    google: any;
  }
}

function App() {
  const [googleClient, setGoogleClient] = useState<any>(null);

  useEffect(() => {
    // Check if the Google Identity Services library has loaded.
    if (window.google) {
      // Initialize the code client.
      const client = window.google.accounts.oauth2.initCodeClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/gmail.readonly",
        ux_mode: "popup",
        callback: (response: any) => {
          console.log("Authorization Code:", response.code);
        },
      });
      setGoogleClient(client);
    }
  }, []); // The empty dependency array means this runs once on component mount.

  const handleAuthClick = () => {
    if (googleClient) {
      googleClient.requestCode();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Brand Manager</h1>
        <p>Connect your email to get started.</p>
        <button onClick={handleAuthClick} disabled={!googleClient}>
          Connect Gmail Account
        </button>
      </header>
    </div>
  );
}

export default App;
