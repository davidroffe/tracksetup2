import React from "react";
import { Link } from "react-router-dom";

class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: props.show
    };

    this.toggleMainMenu = this.toggleMainMenu.bind(this);
  }
  static getDerivedStateFromProps(props, currentState) {
    if (currentState.show !== props.show) {
      return {
        show: props.show
      };
    }
    return null;
  }
  toggleMainMenu() {
    this.props.toggle();
  }
  render() {
    return (
      <div id="top-nav-right">
        <button onClick={this.toggleMainMenu}>
          <i className="fa fa-bars fa-lg" />
        </button>
        {this.state.show && (
          <ul id="top-user-menu">
            <li>
              <Link to="/panel/settings">
                <i className="fa fa-cog" />
                Settings
              </Link>
            </li>
            <li>
              <button onClick={this.logOut}>
                <i className="fa fa-power-off" />
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    );
  }
}

export default MainMenu;
