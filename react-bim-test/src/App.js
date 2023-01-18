import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import AddressesList from "./components/addresses-list.component";
import AddAddress from "./components/add-address.component";
import Address from "./components/address.component";

import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <span className="navbar-brand">BIM Test</span>

          {currentUser && (
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/addresses"} className="nav-link">
                  List Address
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/addresses/add"} className="nav-link">
                  Add Address
                </Link>
              </li>
            </div>
          )}

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <span className="nav-link">{currentUser.username}</span>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addresses" element={<AddressesList />} />
            <Route path="/addresses/add" element={<AddAddress />} />
            <Route path="/addresses/:id" element={<Address />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
