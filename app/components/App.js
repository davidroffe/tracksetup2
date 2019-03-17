import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Splash from "./Splash";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Splash} />
        </div>
      </Router>
    );
  }
}

export default App;
