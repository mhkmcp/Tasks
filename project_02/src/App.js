import React from "react";
import AddUser from "./components/addUser";
import DisplayUser from "./components/displayUser";
import Header from "./components/header";
import UpdateUser from "./components/updateUser";
import DialogView from "./components/dialogView";
import "./App.css";

class App extends React.Component {
  state = { data: [], update: false, currentUser: null };
  updateState = () => {
    let data = JSON.parse(localStorage.getItem("user"));
    this.setState({ data: data });
  };
  deleteUser = deleteId => {
    let user = this.state.data;
    let updatedList = user.filter(user => user.id !== deleteId);
    localStorage.setItem("user", JSON.stringify(updatedList));
    this.updateState();
  };
  updateUserInfo = (e, user) => {
    e.preventDefault();
    let data = JSON.parse(localStorage.getItem("user"));
    let updatedUsers = data.map(data => (data.id === user.id ? user : data));
    localStorage.setItem("user", JSON.stringify(updatedUsers));
    this.toggleUpdate();
    this.setState({ currentUser: user });
  };
  toggleUpdate = () => {
    if (this.state.update !== true) this.setState({ update: true });
  };
  cancelUpdate = () => {
    if (this.state.update !== false) this.setState({ update: false });
  };
  componentDidMount() {
    this.updateState();
  }
  render() {
    let users = this.state.data;
    return (
      <div className="App">
        <Header />
        <h1> User List: </h1>
        <p> Quickly Build an Effective User table</p>

        {this.state.update ? (
          <UpdateUser
            cancelUpdate={this.cancelUpdate}
            updateState={this.updateState}
            currentUser={this.state.currentUser}
          />
        ) : (
            <AddUser updateState={this.updateState} />
          )}
        <TableIndex />
        <div className="displayList">
          {users ? (
            users.map((value, index) => (
              <div className="userList" key={index}>
                <DisplayUser index={index + 1} data={value} />
                <div className="button-div">
                  <button
                    onClick={() => this.deleteUser(value.id)}
                    className="button-delete"
                  >
                    delete
                  </button>
                  <DialogView currentUser={value} />
                  <button
                    onClick={e => this.updateUserInfo(e, value)}
                    className="button-primary"
                  >
                    update
                  </button>
                </div>
              </div>
            ))
          ) : (
              <div>No User Found </div>
            )}
        </div>
      </div>
    );
  }
}

export default App;

const TableIndex = () => (
  <div className="tableIndex">
    <li>#</li>
    <li>First</li>
    <li>Last</li>
    <li>Email</li>
    <div className="button-div">Action</div>
  </div>
);
