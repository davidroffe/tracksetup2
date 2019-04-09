import React from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

class AddNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ["", ""],
      title: "",
      message: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(fieldName, event) {
    let newState = {};
    let newValue = event.target.value;

    newState[fieldName] = newValue;
    this.setState(newState);
  }
  handleSubmit(event) {
    event.preventDefault();

    let { error, title, message } = this.state;

    if (title === "" || title === undefined) error[0] = "error";
    if (message === "" || message === undefined) error[1] = "error";

    if (error.length === 0) {
      axios
        .post("/api/note/add", {
          title,
          message
        })
        .then(() => {
          this.props.updateCar();
        });
    } else {
      this.setState({
        error
      });
    }
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <div className="add notes">
          <div className="form-container">
            <h2>Note</h2>
            <form>
              <div>
                <label htmlFor="title" className={this.state.error[0]}>
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  name="name"
                  ng-model="note.new.title"
                />
              </div>
              <div>
                <label htmlFor="message" className={this.state.error[1]}>
                  Notes
                </label>
                <textarea id="message" ng-model="note.new.message" />
              </div>
              <button onClick={this.handleSubmit}>Add</button>
              <button className="cancel" onClick={this.props.handleClose}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddNote;
