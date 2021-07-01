import React from "react";
import Header from "./components/header/Header";
import Routes from "./components/Routes";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Routes />
      </main>
    </React.Fragment>
  );
}

export default App;
