import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddCar from "./AddCar";
import DeleteCar from "./DeleteCar";

class CarList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddCar: false,
      showDeleteCar: false,
      cars: []
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateCarList = this.updateCarList.bind(this);
  }
  componentDidMount() {
    this.updateCarList();
  }
  updateCarList() {
    axios.get("/api/car/getmulti").then(response => {
      this.setState({
        cars: response.data
      });
    });
  }
  handleClose(modal, event) {
    if (event) event.preventDefault();

    let object = {};

    object[`show${modal}`] = false;
    this.setState(object);
  }

  handleShow(modal, event) {
    let object = {};

    object[`show${modal}`] = true;
    this.setState(object);
  }
  render() {
    return (
      <div id="cars-view">
        <ul>
          {this.state.cars.map(car => {
            return (
              <li key={car._id}>
                <Link
                  className="indi-card live-card def-car"
                  to={`/panel/car/${car._id}`}
                >
                  <img src={car.avatar} alt="" />
                  <p>{car.name}</p>
                </Link>
              </li>
            );
          })}
          <li className="modify-card">
            <button
              className="split-card create-card"
              onClick={this.handleShow.bind(this, "AddCar")}
            >
              <i className="fa fa-plus" />
              <span>Add a car...</span>
            </button>
            <button
              className="split-card delete-card"
              onClick={this.handleShow.bind(this, "DeleteCar")}
            >
              <i className="fa fa-minus" />
              <span>Delete a car...</span>
            </button>
          </li>
        </ul>
        <AddCar
          cars={this.state.cars}
          show={this.state.showAddCar}
          handleClose={this.handleClose.bind(this, "AddCar")}
          updateCarList={this.updateCarList}
        />
        <DeleteCar
          cars={this.state.cars}
          show={this.state.showDeleteCar}
          handleClose={this.handleClose.bind(this, "DeleteCar")}
          updateCarList={this.updateCarList}
        />
      </div>
    );
  }
}

export default CarList;
