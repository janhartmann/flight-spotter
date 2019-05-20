import * as React from "react";
import * as ReactDOM from "react-dom";
import { ThemeProvider } from "react-jss";
import { ApolloProvider } from "react-apollo";

import "./styles/index.css";
import { DEFAULT_THEME } from "./styles/theme";

import App from "./App";
import { client } from "./data/apollo";

const CompositionRoot: React.FC = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={DEFAULT_THEME}>
      <App />
    </ThemeProvider>
  </ApolloProvider>
);

ReactDOM.render(<CompositionRoot />, document.getElementById("root"));
