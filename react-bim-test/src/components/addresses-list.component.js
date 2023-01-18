import React, { Component } from "react";
import AddressDataService from "../services/address.service";
import AuthService from "../services/auth.service";
import { Link, Navigate } from "react-router-dom";

export default class AddressesList extends Component {
  constructor(props) {
    super(props);
    this.retrieveAddresses = this.retrieveAddresses.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);

    this.state = {
      addresses: [],
      currentAddress: null,
      currentIndex: -1,
      redirect: null,
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/login" });
    this.retrieveAddresses();
  }

  retrieveAddresses() {
    AddressDataService.getAllParse()
      .then((response) => {
        this.setState({
          addresses: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentAddress: tutorial,
      currentIndex: index,
    });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }
    const { addresses, currentAddress, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Addresses List</h4>

          <ul className="list-group">
            {addresses &&
              addresses.map((address, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(address, index)}
                  key={index}
                >
                  {address.estado}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentAddress ? (
            <div>
              <h4>Address</h4>
              <div>
                <label>
                  <strong>Estado:</strong>
                </label>{" "}
                {currentAddress.estado}
              </div>
              <div>
                <label>
                  <strong>Municipio:</strong>
                </label>{" "}
                {currentAddress.municipio}
              </div>
              <div>
                <label>
                  <strong>CP:</strong>
                </label>{" "}
                {currentAddress.cp}
              </div>

              <Link
                to={"/addresses/" + currentAddress.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an Address...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
