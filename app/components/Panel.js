import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CarList from "./CarList";

class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      menuVisible: false
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
  userMenuVisible(event) {
    event.stopPropagation();

    var menuVisible = !this.state.menuVisible;
    this.setState({
      menuVisible
    });
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
          <div id="top-nav-right">
            <button onClick={this.userMenuVisible}>
              <i className="fa fa-bars fa-lg" />
            </button>
            {this.state.clicked && (
              <ul id="top-user-menu">
                <li>
                  <a onClick={this.state.toggleSettings}>
                    <i className="fa fa-cog" />
                    Settings
                  </a>
                </li>
                <li>
                  <a ng-href="" onClick={this.state.logOut}>
                    <i className="fa fa-power-off" />
                    Logout
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div id="content">
          <CarList />
        </div>
      </div>
    );
  }
}

export default Panel;
