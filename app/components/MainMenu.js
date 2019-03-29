import React from "react";
import { Link } from "react-router-dom";

const MainMenu = props => {
  return (
    <div id="top-nav-right">
      <button onClick={props.toggle.bind("showMainMenu", true)}>
        <i className="fa fa-bars fa-lg" />
      </button>
      {props.show && (
        <ul id="top-user-menu">
          <li>
            <Link to="/panel/settings">
              <i className="fa fa-cog" />
              Settings
            </Link>
          </li>
          <li>
            <button>
              <i className="fa fa-power-off" />
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default MainMenu;
