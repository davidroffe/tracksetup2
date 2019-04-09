import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddCard from "./AddCard";

class CarDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      car: {
        data: {
          avatar: "",
          name: ""
        }
      },
      card: {
        data: [],
        dataCopy: [],
        del: {
          keepOpen: false,
          delButton: "delete",
          isOpen: false,
          open: function() {},
          cancelOrUndo: function() {},
          canOrUndoLabel: "label",
          canOrUndoIcon: "",
          setDel: function() {},
          chkBox: []
        },
        add: {
          open: function() {}
        },
        titleHeader: ""
      },
      note: {
        data: [],
        dataCopy: [],
        noteSelClass: "",
        del: {
          open: function() {},
          keepOpen: false,
          delButton: "label",
          isOpen: false,
          cancelOrUndo: function() {},
          canOrUndoLabel: "label",
          canOrUndoIcon: "",
          setDel: function() {},
          chkBox: []
        },
        add: {
          open: function() {}
        },
        open: function() {},
        titleHeader: ""
      },
      showAddCard: false,
      showAddNote: false,
      cars: []
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getCarData = this.getCarData.bind(this);
  }
  componentDidMount() {
    this.getCarData();
  }
  getCarData() {
    axios
      .get(`/api/car/getsingle/${this.props.match.params.carId}`)
      .then(response => {
        let newState = {
          car: {}
        };

        newState.car.data = response.data;
        this.setState(newState);
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
      <div>
        <Link to="/panel/cars" className="side-tab back car">
          Cars
          <i className="fa fa-arrow-circle-left fa-2x" />
        </Link>
        <div className="car title">
          <div>
            <img src={this.state.car.data.avatar} alt="" />
            <button onClick={this.showEditCar}>
              <i className="fa fa-pencil-alt fa-2x" />
            </button>
          </div>
          <h1>{this.state.car.data.name}</h1>
        </div>
        <div className="container cards notes">
          <div id="car-cards">
            <div id="cards-title">
              <div id="del-card">
                {this.state.card.dataCopy[0] ? (
                  <Link
                    className={this.state.card.del.keepOpen}
                    onClick={this.state.card.del.open}
                  >
                    <i className="fa fa-minus fa-lg" />
                    <span className={this.state.card.del.keepOpen}>
                      {this.state.card.del.delButton}
                    </span>
                  </Link>
                ) : null}
              </div>
              <div id="add-card">
                <button onClick={this.handleShow.bind(this, "AddCard")}>
                  <i className="fa fa-plus fa-lg" />
                  <span>New Card</span>
                </button>
              </div>
              <h1 className={this.state.card.titleHeader}>Cards</h1>
              {this.state.card.del.isOpen ? (
                <button
                  className="del-opt"
                  onClick={this.state.card.del.cancelOrUndo}
                >
                  {this.state.card.del.canOrUndoLabel}
                  <i className={this.state.card.del.canOrUndoIcon} />
                </button>
              ) : null}
            </div>
            <ul id="card-sel-container">
              {this.state.card.data.map((cards, index) => {
                return (
                  <li key={index}>
                    <button
                      onClick={this.state.card.del.setDel.bind(
                        cards._id,
                        index
                      )}
                      className={this.state.card.del.chkBox[index]}
                    />
                    <Link to={`panel/card/${cards._id}`} className="cardClass">
                      <p className="col-1">{cards.name}</p>
                      <p className="col-3">{cards.track}</p>
                      <p className="col-2">{cards.date}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div id="car-notes">
            <div id="notes-title">
              <div id="del-note">
                {this.state.note.dataCopy[0] ? (
                  <button
                    onClick={this.state.note.del.open}
                    className={this.state.note.del.keepOpen}
                  >
                    <i className="fa fa-minus fa-lg" />
                    <span className={this.state.note.del.keepOpen}>
                      {this.state.note.del.delButton}
                    </span>
                  </button>
                ) : null}
              </div>
              <div id="add-note">
                <button onClick={this.state.note.add.open}>
                  <i className="fa fa-plus fa-lg" />
                  <span>New Card</span>
                </button>
              </div>
              <h1 className={this.state.note.titleHeader}>Notes</h1>
              {this.state.note.del.isOpen ? (
                <button
                  className="del-opt"
                  onClick={this.state.note.del.cancelOrUndo}
                >
                  {this.state.note.del.canOrUndoLabel}
                  <i className={this.state.note.del.canOrUndoIcon} />
                </button>
              ) : null}
            </div>
            <ul id="note-sel-container">
              {this.state.note.data.map((notes, index) => {
                <li>
                  <button
                    onClick={this.state.note.del.setDel.bind(notes._id, index)}
                    className={this.state.note.del.chkBox[index]}
                  />
                  <button
                    onClick={this.state.note.open.bind(index)}
                    className={this.state.note.noteSelClass}
                  >
                    <p>{notes.title}</p>
                  </button>
                </li>;
              })}
            </ul>
          </div>
        </div>
        <AddCard
          car={this.state.car}
          show={this.state.showAddCard}
          handleClose={this.handleClose.bind(this, "AddCard")}
          updateCarList={this.updateCarList}
        />
      </div>
    );
  }
}

export default CarDetail;
