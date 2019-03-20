import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class CarList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cars: []
    };
  }
  componentDidMount() {
    axios.get("/api/car/getmulti").then(response => {
      this.setState({
        cars: response.data
      });
    });
  }
  render() {
    return (
      <div id="cars-view">
        <ul>
          {this.state.cars.map(car => {
            <li>
              <Link
                className="indi-card live-card def-car"
                to={`panel/car/${car._id}`}
              >
                <img src={car.avatar} alt="" />
                <p>{car.name}</p>
              </Link>
            </li>;
          })}
          <li className="modify-card">
            <div className="split-card create-card" ng-click="addCarOpen()">
              <i className="fa fa-plus" />
              <span>Add a car...</span>
            </div>
            <div className="split-card delete-card" ng-click="delCarOpen()">
              <i className="fa fa-minus" />
              <span>Delete a car...</span>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default CarList;
