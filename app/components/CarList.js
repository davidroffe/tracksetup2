import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddCar from "./AddCar";

class CarList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      cars: []
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    axios.get("/api/car/getmulti").then(response => {
      this.setState({
        cars: response.data
      });
    });
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
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
            <button
              className="split-card create-card"
              onClick={this.handleShow}
            >
              <i className="fa fa-plus" />
              <span>Add a car...</span>
            </button>
            <div className="split-card delete-card" ng-click="delCarOpen()">
              <i className="fa fa-minus" />
              <span>Delete a car...</span>
            </div>
          </li>
        </ul>
        <AddCar show={this.state.show} handleClose={this.handleClose} />
      </div>
    );
  }
}

export default CarList;
