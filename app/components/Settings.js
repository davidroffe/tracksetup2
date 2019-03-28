import React from "react";
import axios from "axios";

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      email: "",
      showEmailMessage: false,
      emailMessage: "",
      password: "",
      passwordConfirm: "",
      showPasswordMessage: false,
      passwordMessage: "",
      delChk: false,
      delChkClass: ""
    };

    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }
  componentDidMount() {
    axios.get("/api/user/getsingle").then(response => {
      this.setState({
        user: response.data
      });
    });
  }
  handleChange(fieldName, event) {
    let newState = {};
    let newValue = event.target.value;

    newState[fieldName] = newValue;
    this.setState(newState);
  }
  updateEmail() {
    const newEmail = this.state.email;
    const currentEmail = this.state.user.email;

    if (
      newEmail !== "" &&
      newEmail !== undefined &&
      newEmail !== currentEmail
    ) {
      axios
        .post("/api/user/updateemail", {
          email: newEmail
        })
        .then(response => {
          let updatedUser = this.state.user;

          updatedUser.email = newEmail;
          this.setState({
            user: updatedUser,
            emailMessage: "Email updated successfully.",
            showEmailMessage: true
          });
        })
        .catch(response => {
          this.setState({
            emailMessage: "Invalid email.",
            showEmailMessage: true
          });
        });
    } else {
      //Handle case and show indicator
    }
  }
  updatePassword() {
    const newPassword = this.state.password;
    const passwordConfirm = this.state.passwordConfirm;

    if (
      newPassword === "" ||
      newPassword === undefined ||
      newPassword.length < 8
    ) {
      this.setState({
        passwordMessage: "Must be 8 characters or longer.",
        showPasswordMessage: true
      });
    } else if (newPassword === passwordConfirm) {
      axios
        .post("/api/user/updatepass", {
          password: newPassword
        })
        .then(response => {
          this.setState({
            password: "",
            passwordConfirm: "",
            passwordMessage: "Password updated successfully.",
            showPasswordMessage: true
          });
        })
        .catch(response => {
          this.setState({
            passwordMessage: "Invalid Password.",
            showPasswordMessage: true
          });
        });
    } else {
      this.setState({
        passwordMessage: "Passwords do not match.",
        showPasswordMessage: true
      });
    }
  }
  deleteAccount() {
    if (this.state.delChk) {
      axios.post("/api/user/del").then(response => {
        this.props.history.push("/");
      });
    } else {
      this.setState({
        delChkClass: "delete error"
      });
    }
  }
  render() {
    return (
      <div>
        <div className="settings title">
          <h1>
            <i className="fa fa-cog" />
            Settings
          </h1>
        </div>
        <div className="container cards notes">
          <div id="settings">
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                value={this.state.email}
                onChange={this.handleChange.bind(this, "email")}
              />
              {this.state.showEmailMessage && <p>{this.state.emailMessage}</p>}
              <button className="button" onClick={this.updateEmail}>
                Update
              </button>
            </div>
            <div>
              <label htmlFor="password">Change Password</label>
              <input
                id="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange.bind(this, "password")}
              />
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                value={this.state.passwordConfirm}
                onChange={this.handleChange.bind(this, "passwordConfirm")}
              />
              {this.state.showPasswordMessage && (
                <p>{this.state.passwordMessage}</p>
              )}
              <button className="button" onClick={this.updatePassword}>
                Update
              </button>
            </div>
            <div className="delete">
              <p className="label">Delete Account</p>
              <p className="warning">This action is irreversible.</p>
              <input
                id="delete"
                type="checkbox"
                value={this.state.delChk}
                onChange={this.handleChange.bind(this, "delChk")}
              />
              <label htmlFor="delete" className={this.state.delChkClass}>
                Yes, I want to delete my account.
              </label>
              <button className="button" onClick={this.deleteAccount}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
