import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Splash from "./Splash";
import Panel from "./Panel";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Splash} />
          <Route path="/panel" component={Panel} />
        </div>
      </Router>
    );
  }
}

export default App;
