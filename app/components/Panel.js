import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import CarList from "./CarList";
import MainMenu from "./MainMenu";
import Settings from "./Settings";

class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      showMainMenu: false
    };
  }
  componentDidMount() {
    // axios
    //   .get("/api/user")
    //   .then(function(response) {
    //     this.setState({ user: response });
    //   })
    //   .catch(function(error) {
    //     alert(error.message);
    //   });
  }
  toggle(name, event) {
    const newValue = !this.state[name];
    let newState = {};

    newState[name] = newValue;

    this.setState(newState);
  }
  logOut() {
    axios
      .get("/api/logout")
      .then(function() {
        setTimeout(function() {
          this.props.history("/");
        }, 100);
      })
      .catch(function(error) {
        console.log("error is " + error);
      });
  }
  render() {
    return (
      <div>
        <div id="top-nav">
          <div id="top-nav-left">
            <Link to="/panel" className="logo">
              <img src="/assets/img/tire-logo.png" alt="Tire logo" />
              <div>Track Setup</div>
            </Link>
          </div>
          <MainMenu
            show={this.state.showMainMenu}
            toggle={this.toggle.bind(this, "showMainMenu")}
          />
        </div>
        <div id="content">
          <Router>
            <Route path="/panel/cars" component={CarList} />
            <Route path="/panel/settings" component={Settings} />
          </Router>
        </div>
      </div>
    );
  }
}

export default Panel;
