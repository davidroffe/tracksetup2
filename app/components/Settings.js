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
      confirmPassword: "",
      showPasswordMessage: false,
      passwordMessage: "",
      delChk: false,
      delChkClass: ""
    };

    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    axios.get("/api/user/getsingle").then(response => {
      this.setState({
        user: response.data
      });
    });
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
    }
  }
  updatePassword() {
    const newPassword = this.state.password;
    const passwordConfirm = this.state.user.email;

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
        this.logout();
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
              <input id="email" type="text" vaule={this.state.email} />
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
              />
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                value={this.state.confirmPassword}
              />
              {this.state.showPasswordMessage && (
                <p>{this.state.passwordMessage}</p>
              )}
              <button className="button" onClick={this.updatePassword}>
                Update
              </button>
            </div>
            <div className="delete">
              <label>Delete Account</label>
              <p>This action is irreversible.</p>
              <input id="delete" type="checkbox" value={this.state.delChk} />
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
