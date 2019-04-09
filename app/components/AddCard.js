import React from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

class AddCard extends React.Component {
  constructor(props) {
    super(props);

    let show = [];

    for (var i = 0; i <= 13; i++) {
      show[i] = false;
    }

    this.state = {
      name: "",
      year: "2007",
      make: "",
      model: "",
      shockType: "one",
      show
    };

    this.toggle = this.toggle.bind(this);
    this.expandAll = this.expandAll.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggle(index, event) {
    let show = this.state.show;

    show[index] = !show[index];

    this.setState({
      show
    });
  }
  expandAll() {
    let show = this.state.show;

    show = show.map(field => true);

    this.setState({
      show
    });
  }
  handleChange(fieldName, event) {
    let newState = {};
    let newValue = event.target.value;

    newState[fieldName] = newValue;
    this.setState(newState);
  }
  handleSubmit(event) {
    event.preventDefault();

    let error = [];
    let { name, year, make, model } = this.state;

    if (name === "" || typeof name === "undefined") error.push("error");
    if (year === "" || typeof year === "undefined") error.push("error");
    if (make === "" || typeof make === "undefined") error.push("error");
    if (model === "" || typeof model === "undefined") error.push("error");

    if (error.length === 0) {
      let avatar = "/assets/img/car/default/def.png";

      axios
        .post("/api/car/add", {
          avatar,
          name,
          year,
          make,
          model
        })
        .then(() => {
          this.props.updateCarList();
        });
    }
  }
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <div className="add cards">
          <div className="form-container">
            <h2>Add New Card</h2>
            <p className="add cards expand" onClick={this.expandAll}>
              <i className="fa fa-arrows-v expand add cards" />
              Expand All
            </p>
            <form>
              <div>
                <label htmlFor="cardName">
                  <span onClick={this.toggle.bind(null, 0)}>
                    <i
                      className={
                        this.state.show[0]
                          ? "fa fa-minus-square-o"
                          : "fa fa-plus-square-o"
                      }
                    />
                    Name
                  </span>
                </label>
                {this.state.show[0] ? (
                  <div>
                    <input
                      className="single"
                      type="text"
                      id="cardName"
                      name="name"
                      onChange={this.handleChange.bind(null, "name")}
                      placeholder="eg Wet Weather"
                    />
                  </div>
                ) : null}
              </div>
              <div>
                <label htmlFor="trackName">
                  <span onClick={this.toggle.bind(null, 1)}>
                    <i
                      className={
                        this.state.show[1]
                          ? "fa fa-minus-square-o"
                          : "fa fa-plus-square-o"
                      }
                    />
                    Track
                  </span>
                </label>
                {this.state.show[1] ? (
                  <div>
                    <input
                      id="trackName"
                      className="single"
                      type="text"
                      name="track"
                      onChange={this.handleChange.bind(null, "track")}
                      placeholder="eg Road Atlanta"
                    />
                  </div>
                ) : null}
              </div>
              <div>
                <label htmlFor="toe">
                  <span onClick={this.toggle.bind(null, 2)}>
                    <i
                      className={
                        this.state.show[2]
                          ? "fa fa-minus-square-o"
                          : "fa fa-plus-square-o"
                      }
                    />
                    Toe
                  </span>
                </label>
                {this.state.show[2] ? (
                  <div>
                    <input
                      id="toe"
                      type="text"
                      name="toe-f"
                      onChange={this.handleChange.bind(null, "toeFront")}
                      placeholder="FRONT"
                    />
                    <input
                      id="toe-r"
                      type="text"
                      name="toe-r"
                      onChange={this.handleChange.bind(null, "toeRear")}
                      placeholder="REAR"
                    />
                  </div>
                ) : null}
              </div>
              <div>
                <label htmlFor="camber">
                  <span onClick={this.toggle.bind(null, 3)}>
                    <i
                      className={
                        this.state.show[3]
                          ? "fa fa-minus-square-o"
                          : "fa fa-plus-square-o"
                      }
                    />
                    Camber
                  </span>
                </label>
                {this.state.show[3] ? (
                  <div>
                    <input
                      id="camber"
                      type="text"
                      name="camber-fl"
                      onChange={this.handleChange.bind(
                        null,
                        "camber.frontLeft"
                      )}
                      placeholder="FRONT LEFT"
                    />
                    <input
                      type="text"
                      name="camber-fr"
                      onChange={this.handleChange.bind(
                        null,
                        "camber.frontRight"
                      )}
                      placeholder="FRONT RIGHT"
                    />
                    <input
                      type="text"
                      name="camber-rl"
                      onChange={this.handleChange.bind(null, "camber.rearLeft")}
                      placeholder="REAR LEFT"
                    />
                    <input
                      type="text"
                      name="camber-rr"
                      onChange={this.handleChange.bind(
                        null,
                        "camber.rearRight"
                      )}
                      placeholder="REAR RIGHT"
                    />
                  </div>
                ) : null}
              </div>
              <div>
                <label htmlFor="caster">
                  <span onClick={this.toggle.bind(null, 4)}>
                    <i
                      className={
                        this.state.show[4]
                          ? "fa fa-minus-square-o"
                          : "fa fa-plus-square-o"
                      }
                    />
                    Caster
                  </span>
                </label>
                {this.state.show[4] ? (
                  <div>
                    <input
                      id="caster"
                      type="text"
                      name="caster-f"
                      onChange={this.handleChange.bind(null, "caster.left")}
                      placeholder="LEFT"
                    />
                    <input
                      type="text"
                      name="caster-r"
                      onChange={this.handleChange.bind(null, "caster.right")}
                      placeholder="RIGHT"
                    />
                  </div>
                ) : null}
              </div>
              <div>
                <label>
                  <span onClick={this.toggle.bind(null, 5)}>
                    <i
                      className={
                        this.state.show[5]
                          ? "fa fa-minus-square-o"
                          : "fa fa-plus-square-o"
                      }
                    />
                    Springs
                  </span>
                </label>
                {this.state.show[5] ? (
                  <div className="ctg-2">
                    <label htmlFor="rates">
                      <span onClick={this.toggle.bind(null, 6)}>
                        <i
                          className={
                            this.state.show[6]
                              ? "fa fa-minus-square-o"
                              : "fa fa-plus-square-o"
                          }
                        />
                        Rates
                      </span>
                    </label>
                    {this.state.show[6] ? (
                      <div>
                        <input
                          id="rates"
                          type="text"
                          name="spring-rates-fl"
                          onChange={this.handleChange.bind(
                            null,
                            "spring.rate.frontLeft"
                          )}
                          placeholder="FRONT LEFT"
                        />
                        <input
                          type="text"
                          name="spring-rates-fr"
                          onChange={this.handleChange.bind(
                            null,
                            "spring.rate.frontRight"
                          )}
                          placeholder="FRONT RIGHT"
                        />
                        <input
                          type="text"
                          name="spring-rates-rl"
                          onChange={this.handleChange.bind(
                            null,
                            "spring.rate.rearLeft"
                          )}
                          placeholder="REAR LEFT"
                        />
                        <input
                          type="text"
                          name="spring-rates-rr"
                          onChange={this.handleChange.bind(
                            null,
                            "spring.rate.rearRight"
                          )}
                          placeholder="REAR RIGHT"
                        />
                      </div>
                    ) : null}
                    <label htmlFor="length">
                      <span onClick={this.toggle.bind(null, 7)}>
                        <i
                          className={
                            this.state.show[7]
                              ? "fa fa-minus-square-o"
                              : "fa fa-plus-square-o"
                          }
                        />
                        Length
                      </span>
                    </label>
                    {this.state.show[7] ? (
                      <div>
                        <input
                          id="length"
                          type="text"
                          name="spring-length-fl"
                          onChange={this.handleChange.bind(
                            null,
                            "spring.length.frontLeft"
                          )}
                          placeholder="FRONT LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-fr"
                          onChange={this.handleChange.bind(
                            null,
                            "spring.length.frontRight"
                          )}
                          placeholder="FRONT RIGHT"
                        />
                        <input
                          type="text"
                          name="spring-length-rl"
                          onChange={this.handleChange.bind(
                            null,
                            "spring.length.rearLeft"
                          )}
                          placeholder="REAR LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-rr"
                          onChange={this.handleChange.bind(
                            null,
                            "spring.length.rearRight"
                          )}
                          placeholder="REAR RIGHT"
                        />
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div>
                <label htmlFor="r1">
                  <span onClick={this.toggle.bind(null, 8)}>
                    <i
                      className={
                        this.state.show[8]
                          ? "fa fa-minus-square-o"
                          : "fa fa-plus-square-o"
                      }
                    />
                    Shocks
                  </span>
                </label>
                {this.state.show[8] ? (
                  <div>
                    <div>
                      <input
                        type="radio"
                        id="r1"
                        name="shockType"
                        onChange={this.handleChange.bind(null, "shockType")}
                        value="one"
                      />
                      <label htmlFor="r1" className="radio">
                        1-Way
                      </label>
                      <input
                        type="radio"
                        id="r2"
                        name="shockType"
                        onChange={this.handleChange.bind(null, "shockType")}
                        value="two"
                      />
                      <label htmlFor="r2" className="radio">
                        2-Way
                      </label>
                      <input
                        type="radio"
                        id="r3"
                        name="shockType"
                        onChange={this.handleChange.bind(null, "shockType")}
                        value="three"
                      />
                      <label htmlFor="r3" className="radio">
                        3-Way
                      </label>
                      <input
                        type="radio"
                        id="r4"
                        name="shockType"
                        onChange={this.handleChange.bind(null, "shockType")}
                        value="four"
                      />
                      <label htmlFor="r4" className="radio">
                        4-Way
                      </label>
                    </div>
                    {this.state.shockType === "one" ? (
                      <div className="ctg-2">
                        <input
                          type="text"
                          name="spring-length-fl"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.oneWay.frontLeft"
                          )}
                          placeholder="FRONT LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-fr"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.oneWay.frontRight"
                          )}
                          placeholder="FRONT RIGHT"
                        />
                        <input
                          type="text"
                          name="spring-length-rl"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.oneWay.rearLeft"
                          )}
                          placeholder="REAR LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-rr"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.oneWay.rearRight"
                          )}
                          placeholder="REAR RIGHT"
                        />
                      </div>
                    ) : null}
                    {this.state.shockType === "two" ? (
                      <div className="ctg-2">
                        <label>Rebound</label>
                        <input
                          type="text"
                          name="spring-length-fl"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.twoWay.rebound.frontLeft"
                          )}
                          placeholder="FRONT LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-fr"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.twoWay.rebound.frontRight"
                          )}
                          placeholder="FRONT RIGHT"
                        />
                        <input
                          type="text"
                          name="spring-length-rl"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.twoWay.rebound.rearLeft"
                          )}
                          placeholder="REAR LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-rr"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.twoWay.rebound.rearRight"
                          )}
                          placeholder="REAR RIGHT"
                        />
                        <label>Rebound</label>
                        <input
                          type="text"
                          name="spring-length-fl"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.twoWay.compression.frontLeft"
                          )}
                          placeholder="FRONT LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-fr"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.twoWay.compression.frontRight"
                          )}
                          placeholder="FRONT RIGHT"
                        />
                        <input
                          type="text"
                          name="spring-length-rl"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.twoWay.compression.rearLeft"
                          )}
                          placeholder="REAR LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-rr"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.twoWay.compression.rearRight"
                          )}
                          placeholder="REAR RIGHT"
                        />
                      </div>
                    ) : null}
                    {this.state.shockType === "three" ? (
                      <div className="ctg-2">
                        <label>Rebound</label>
                        <input
                          type="text"
                          name="spring-length-fl"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.rebound.frontLeft"
                          )}
                          placeholder="FRONT LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-fr"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.rebound.frontRight"
                          )}
                          placeholder="FRONT RIGHT"
                        />
                        <input
                          type="text"
                          name="spring-length-rl"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.rebound.rearLeft"
                          )}
                          placeholder="REAR LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-rr"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.rebound.rearRight"
                          )}
                          placeholder="REAR RIGHT"
                        />
                        <label>Compression</label>
                        <label>Low Speed</label>
                        <input
                          type="text"
                          name="spring-length-fl"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.compression.lowSpeed.frontLeft"
                          )}
                          placeholder="FRONT LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-fr"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.compression.lowSpeed.frontRight"
                          )}
                          placeholder="FRONT RIGHT"
                        />
                        <input
                          type="text"
                          name="spring-length-rl"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.compression.lowSpeed.rearLeft"
                          )}
                          placeholder="REAR LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-rr"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.compression.lowSpeed.rearRight"
                          )}
                          placeholder="REAR RIGHT"
                        />
                        <label>High Speed</label>
                        <input
                          type="text"
                          name="spring-length-fl"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.compression.highSpeed.frontLeft"
                          )}
                          placeholder="FRONT LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-fr"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.compression.highSpeed.frontRight"
                          )}
                          placeholder="FRONT RIGHT"
                        />
                        <input
                          type="text"
                          name="spring-length-rl"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.compression.highSpeed.rearLeft"
                          )}
                          placeholder="REAR LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-rr"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.compression.highSpeed.rearRight"
                          )}
                          placeholder="REAR RIGHT"
                        />
                      </div>
                    ) : null}
                    {this.state.shockType === "four" ? (
                      <div className="ctg-2">
                        <label>Rebound</label>
                        <label>Low Speed</label>
                        <input
                          type="text"
                          name="spring-length-fl"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.rebound.lowSpeed.frontLeft"
                          )}
                          placeholder="FRONT LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-fr"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.rebound.lowSpeed.frontRight"
                          )}
                          placeholder="FRONT RIGHT"
                        />
                        <input
                          type="text"
                          name="spring-length-rl"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.rebound.lowSpeed.rearLeft"
                          )}
                          placeholder="REAR LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-rr"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.rebound.lowSpeed.rearRight"
                          )}
                          placeholder="REAR RIGHT"
                        />
                        <label>High Speed</label>
                        <input
                          type="text"
                          name="spring-length-fl"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.rebound.highSpeed.frontLeft"
                          )}
                          placeholder="FRONT LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-fr"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.rebound.highSpeed.frontRight"
                          )}
                          placeholder="FRONT RIGHT"
                        />
                        <input
                          type="text"
                          name="spring-length-rl"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.rebound.highSpeed.rearLeft"
                          )}
                          placeholder="REAR LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-rr"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.rebound.highSpeed.rearRight"
                          )}
                          placeholder="REAR RIGHT"
                        />
                        <label>Compression</label>
                        <label>Low Speed</label>
                        <input
                          type="text"
                          name="spring-length-fl"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.compression.lowSpeed.frontLeft"
                          )}
                          placeholder="FRONT LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-fr"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.compression.lowSpeed.frontRight"
                          )}
                          placeholder="FRONT RIGHT"
                        />
                        <input
                          type="text"
                          name="spring-length-rl"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.compression.lowSpeed.rearLeft"
                          )}
                          placeholder="REAR LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-rr"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.compression.lowSpeed.rearRight"
                          )}
                          placeholder="REAR RIGHT"
                        />
                        <label>High Speed</label>
                        <input
                          type="text"
                          name="spring-length-fl"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.compression.highSpeed.frontLeft"
                          )}
                          placeholder="FRONT LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-fr"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.compression.highSpeed.frontRight"
                          )}
                          placeholder="FRONT RIGHT"
                        />
                        <input
                          type="text"
                          name="spring-length-rl"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.compression.highSpeed.rearLeft"
                          )}
                          placeholder="REAR LEFT"
                        />
                        <input
                          type="text"
                          name="spring-length-rr"
                          onChange={this.handleChange.bind(
                            null,
                            "shock.threeWay.compression.highSpeed.rearRight"
                          )}
                          placeholder="REAR RIGHT"
                        />
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div>
                <label htmlFor="cornWeights">
                  <span onClick={this.toggle.bind(null, 9)}>
                    <i
                      className={
                        this.state.show[9]
                          ? "fa fa-minus-square-o"
                          : "fa fa-plus-square-o"
                      }
                    />
                    Corner Weights
                  </span>
                </label>
                {this.state.show[9] ? (
                  <div>
                    <input
                      id="cornWeights"
                      type="text"
                      name="corner-weights-fl"
                      onChange={this.handleChange.bind(
                        null,
                        "cornerWeight.frontLeft"
                      )}
                      placeholder="FRONT LEFT"
                    />
                    <input
                      type="text"
                      name="corner-weights-fr"
                      onChange={this.handleChange.bind(
                        null,
                        "cornerWeight.frontRight"
                      )}
                      placeholder="FRONT RIGHT"
                    />
                    <input
                      type="text"
                      name="corner-weights-rl"
                      onChange={this.handleChange.bind(
                        null,
                        "cornerWeight.rearLeft"
                      )}
                      placeholder="REAR LEFT"
                    />
                    <input
                      type="text"
                      name="corner-weights-rr"
                      onChange={this.handleChange.bind(
                        null,
                        "cornerWeight.rearRight"
                      )}
                      placeholder="REAR RIGHT"
                    />
                  </div>
                ) : null}
              </div>
              <div>
                <label htmlFor="swaybars">
                  <span onClick={this.toggle.bind(null, 10)}>
                    <i
                      className={
                        this.state.show[10]
                          ? "fa fa-minus-square-o"
                          : "fa fa-plus-square-o"
                      }
                    />
                    Corner Weights
                  </span>
                </label>
                {this.state.show[10] ? (
                  <div>
                    <input
                      id="swaybars"
                      type="text"
                      name="swaybars-f"
                      onChange={this.handleChange.bind(null, "swaybar.front")}
                      placeholder="FRONT"
                    />
                    <input
                      type="text"
                      name="swaybars-r"
                      onChange={this.handleChange.bind(null, "swaybar.rear")}
                      placeholder="Rear"
                    />
                  </div>
                ) : null}
              </div>
              <div>
                <label>
                  <span onClick={this.toggle.bind(null, 11)}>
                    <i
                      className={
                        this.state.show[11]
                          ? "fa fa-minus-square-o"
                          : "fa fa-plus-square-o"
                      }
                    />
                    Tires
                  </span>
                </label>
                {this.state.show[11] ? (
                  <div className="ctg-2">
                    <label htmlFor="coldPress">
                      <span onClick={this.toggle.bind(null, 12)}>
                        <i
                          className={
                            this.state.show[12]
                              ? "fa fa-minus-square-o"
                              : "fa fa-plus-square-o"
                          }
                        />
                        Cold Pressures
                      </span>
                    </label>
                    {this.state.show[12] ? (
                      <div>
                        <input
                          id="coldPress"
                          type="text"
                          name="cold-tire-pressures-fl"
                          onChange={this.handleChange.bind(
                            null,
                            "tire.coldPressure.frontLeft"
                          )}
                          placeholder="FRONT LEFT"
                        />
                        <input
                          type="text"
                          name="cold-tire-pressures-fr"
                          onChange={this.handleChange.bind(
                            null,
                            "tire.coldPressure.frontRight"
                          )}
                          placeholder="FRONT RIGHT"
                        />
                        <input
                          type="text"
                          name="cold-tire-pressures-rl"
                          onChange={this.handleChange.bind(
                            null,
                            "tire.coldPressure.rearLeft"
                          )}
                          placeholder="REAR LEFT"
                        />
                        <input
                          type="text"
                          name="cold-tire-pressures-rr"
                          onChange={this.handleChange.bind(
                            null,
                            "tire.coldPressure.rearRight"
                          )}
                          placeholder="REAR RIGHT"
                        />
                      </div>
                    ) : null}
                    <label htmlFor="hotPress">
                      <span onClick={this.toggle.bind(null, 13)}>
                        <i
                          className={
                            this.state.show[13]
                              ? "fa fa-minus-square-o"
                              : "fa fa-plus-square-o"
                          }
                        />
                        Hot Pressures
                      </span>
                    </label>
                    {this.state.show[13] ? (
                      <div>
                        <input
                          id="hotPress"
                          type="text"
                          name="hot-tire-pressures-fl"
                          onChange={this.handleChange.bind(
                            null,
                            "tire.hotPressure.frontLeft"
                          )}
                          placeholder="FRONT LEFT"
                        />
                        <input
                          type="text"
                          name="hot-tire-pressures-fr"
                          onChange={this.handleChange.bind(
                            null,
                            "tire.hotPressure.frontRight"
                          )}
                          placeholder="FRONT RIGHT"
                        />
                        <input
                          type="text"
                          name="hot-tire-pressures-rl"
                          onChange={this.handleChange.bind(
                            null,
                            "tire.hotPressure.rearLeft"
                          )}
                          placeholder="REAR LEFT"
                        />
                        <input
                          type="text"
                          name="hot-tire-pressures-rr"
                          onChange={this.handleChange.bind(
                            null,
                            "tire.hotPressure.rearRight"
                          )}
                          placeholder="REAR RIGHT"
                        />
                      </div>
                    ) : null}
                  </div>
                ) : null}
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

export default AddCard;
