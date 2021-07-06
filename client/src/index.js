import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ModalProvider } from "./context/ModalContext";
import { UserProvider } from "./context/UserContext";
import { UserEventProvider } from "./context/UserEventContext";
import { FriendEventProvider } from "./context/FriendEventContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <UserEventProvider>
          <FriendEventProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </FriendEventProvider>
        </UserEventProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
