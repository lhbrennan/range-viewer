import React from 'react';
// import logo from './logo.svg'; // TODO: delete this
// import "./App.css";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider } from "baseui";
import { pokerTheme } from "./theme";

import { Main } from "./components/Main";

const engine = new Styletron();

function App() {
  return (
    <div className="App">
      <StyletronProvider value={engine}>
        <BaseProvider theme={pokerTheme}>
          <Main />
        </BaseProvider>
      </StyletronProvider>
    </div>
  );
}

export default App;
