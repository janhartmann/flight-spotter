import * as React from "react";
import * as ReactDOM from "react-dom";
import { ThemeProvider } from "react-jss";
import { ApolloProvider } from "react-apollo";

import "./styles/index.css";

import App from "./App";
import { client } from "./data/apollo";

const CompositionRoot: React.SFC = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={{}}>
      <App />
    </ThemeProvider>
  </ApolloProvider>
);

ReactDOM.render(<CompositionRoot />, document.getElementById("root"));
