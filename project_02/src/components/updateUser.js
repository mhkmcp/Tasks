import React, { Component } from "react";

class UpdateUser extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: ""
  };
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  updateUserInfo = (e, id) => {
    e.preventDefault();
    let data = JSON.parse(localStorage.getItem("user"));
    let updatedUsers = data.map(user => (user.id === id ? this.state : user));
    localStorage.setItem("user", JSON.stringify(updatedUsers));
    this.props.updateState();
    this.props.cancelUpdate();
  };
  validateForm = () => {
    const { firstName, lastName, email } = this.state;
    const isInvalid = !firstName || !lastName || !email;
    return isInvalid;
  };
  componentDidMount() {
    let currentUser = this.props.currentUser;
    if (currentUser) {
      this.setState(currentUser);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentUser !== this.props.currentUser) {
      this.setState(this.props.currentUser);
    }
  }
  render() {
    let id = this.props.currentUser.id;
    const { firstName, lastName, email } = this.state;
    return (
      <div>
        <form onSubmit={e => this.updateUserInfo(e, id)}>
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
            Update
          </button>
          <button className="button-primary" onClick={this.props.cancelUpdate}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

export default UpdateUser;
