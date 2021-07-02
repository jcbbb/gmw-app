import React from "react";
import Header from "./components/header/Header";
import Routes from "./components/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Routes />
      </main>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
