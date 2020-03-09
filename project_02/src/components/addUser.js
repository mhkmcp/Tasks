import React, { Component } from "react";
const initialState = {
  firstName: "",
  lastName: "",
  email: ""
};

class AddUser extends Component {
  state = { ...initialState };
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  generatedId = () => {
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  };
  validateForm = () => {
    const { firstName, lastName, email } = this.state;
    const isInvalid = !firstName || !lastName || !email;
    return isInvalid;
  };
  handleSubmit = e => {
    e.preventDefault();
    let id = this.generatedId();
    let user = JSON.parse(localStorage.getItem("user") || "[]");
    user.push({ ...this.state, id });
    localStorage.setItem("user", JSON.stringify(user));
    this.props.updateState();
    this.clearState();
  };
  clearState = () => {
    this.setState({ ...initialState });
  };
  render() {
    const { firstName, lastName, email } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            value={firstName}
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={this.handleInput}
          />
          <input
            value={lastName}
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={this.handleInput}
          />
          <input
            value={email}
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.handleInput}
          />
          <button
            className="button-primary"
            type="submit"
            disabled={this.validateForm()}
          >
            {" "}
            Add New User
          </button>
        </form>
      </div>
    );
  }
}

export default AddUser;
