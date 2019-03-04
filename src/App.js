import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import MainPage from "./pages/main";

class App extends Component {
  render() {
    return (
      <Container
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          width: "100%",
          minHeight: 700,
        }}
      >
        <Route exact path="/" component={MainPage} />
      </Container>
    );
  }
}

export default App;
