import React, { Component } from "react";
import AddressDataService from "../services/address.service";
import EstadoDataService from "../services/estado.service";
import MunicipioDataService from "../services/municipio.service";
import authService from "../services/auth.service";

import { withRouter } from "../common/with-router";

class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.onChangeEstado = this.onChangeEstado.bind(this);
    this.onChangeMunicipio = this.onChangeMunicipio.bind(this);
    this.onChangeCP = this.onChangeCP.bind(this);
    this.saveAddress = this.saveAddress.bind(this);
    this.newAddress = this.newAddress.bind(this);

    this.state = {
      id: null,
      estado: "",
      municipio: "",
      cp: "",
      estadoList: [],
      municipioList: [],
    };
  }

  async componentDidMount() {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) this.props.router.navigate("/login");
    const response = await EstadoDataService.getAll();
    this.setState({
      estadoList: response,
    });
  }

  async onChangeEstado(e) {
    this.setState({
      estado: e.target.value,
    });
    const response = await MunicipioDataService.get(e.target.value);
    this.setState({
      municipioList: response,
    });
  }

  onChangeMunicipio(e) {
    this.setState({
      municipio: e.target.value,
    });
  }

  onChangeCP(e) {
    this.setState({
      cp: e.target.value,
    });
  }

  saveAddress() {
    let data = {
      estado: this.state.estado,
      municipio: this.state.municipio,
      cp: this.state.cp,
    };

    AddressDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          estado: response.data.estado,
          municipio: response.data.municipio,
          cp: response.data.cp,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    this.props.router.navigate("/addresses");
    window.location.reload();
  }

  newAddress() {
    this.setState({
      id: null,
      estado: "",
      municipio: "",
      cp: "",
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newAddress}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="FormControlSelectEstado">Estado</label>
              <select
                className="form-control"
                id="FormControlSelectEstado"
                onChange={this.onChangeEstado}
              >
                {this.state.estadoList.map((estado) => (
                  <option value={estado.id} key={estado.id}>
                    {estado.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="FormControlSelectMunicipio">Municipio</label>
              <select
                className="form-control"
                id="FormControlSelectMunicipio"
                onChange={this.onChangeMunicipio}
              >
                {this.state.municipioList.map((municipio) => (
                  <option value={municipio.id} key={municipio.id}>
                    {municipio.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="cp">CP</label>
              <input
                type="number"
                className="form-control"
                id="cp"
                required
                value={this.state.cp}
                onChange={this.onChangeCP}
                name="cp"
              />
            </div>

            <button onClick={this.saveAddress} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(AddAddress);
