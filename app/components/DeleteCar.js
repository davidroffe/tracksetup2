import React from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

class DeleteCar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleClose = this.handleClose.bind(this);
  }
  handleClose(e) {
    if (e) e.preventDefault();
    this.props.handleClose();
  }
  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleClose}>
        <div className="add cars">
          <div className="form-container">
            <h2>Delete Car</h2>
            <div>
              {this.props.cars.map((car, index) => {
                <div>
                  <p>
                    {car.name}
                    <button onClick={this.deleteCar().bind(this, index)}>
                      <i className="fa fa-trash fa-lg" />
                    </button>
                  </p>
                </div>;
              })}
              <button onClick={this.handleClose}>Done</button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default DeleteCar;
