import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js"; // Correct path to App component
import reportWebVitals from "./reportWebVitals.js";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports"; // AWS Amplify configuration

Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App /> {/* App is now wrapped with AWS Amplify's Authenticator */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
