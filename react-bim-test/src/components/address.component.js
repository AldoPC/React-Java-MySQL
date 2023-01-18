import React, { Component } from "react";
import AddressDataService from "../services/address.service";
import EstadoDataService from "../services/estado.service";
import MunicipioDataService from "../services/municipio.service";
import { withRouter } from "../common/with-router";
import authService from "../services/auth.service";

class Address extends Component {
  constructor(props) {
    super(props);
    this.onChangeEstado = this.onChangeEstado.bind(this);
    this.onChangeMunicipio = this.onChangeMunicipio.bind(this);
    this.onChangeCP = this.onChangeCP.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.deleteAddress = this.deleteAddress.bind(this);
    this.refreshMunicipioList = this.refreshMunicipioList.bind(this);

    this.state = {
      currentAddress: {
        id: null,
        estado: "",
        municipio: "",
        cp: "",
      },
      message: "",
      estadoList: [],
      municipioList: [],
    };
  }

  async componentDidMount() {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) this.props.router.navigate("/login");
    this.getAddress(this.props.router.params.id);
  }

  async onChangeEstado(e) {
    const estado = e.target.value;

    this.setState(function (prevState) {
      return {
        currentAddress: {
          ...prevState.currentAddress,
          estado: estado,
        },
      };
    });
    this.refreshMunicipioList(estado);
  }

  async refreshMunicipioList(estado) {
    const responseMunicipio = await MunicipioDataService.get(estado);
    this.setState({
      municipioList: responseMunicipio,
    });
  }

  onChangeMunicipio(e) {
    const municipio = e.target.value;

    this.setState(function (prevState) {
      return {
        currentAddress: {
          ...prevState.currentAddress,
          municipio: municipio,
        },
      };
    });
  }

  onChangeCP(e) {
    const cp = e.target.value;

    this.setState(function (prevState) {
      return {
        currentAddress: {
          ...prevState.currentAddress,
          cp: cp,
        },
      };
    });
  }

  async getAddress(id) {
    const response = await AddressDataService.get(id);
    console.log(response.data);

    const responseEstado = await EstadoDataService.getAll();
    this.setState({
      estadoList: responseEstado,
    });

    this.refreshMunicipioList(response.data.estado);

    this.setState({
      currentAddress: response.data,
    });
  }

  updateAddress() {
    AddressDataService.update(
      this.state.currentAddress.id,
      this.state.currentAddress
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The tutorial was updated successfully!",
        });
        console.log(response.data);
        this.props.router.navigate("/addresses");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteAddress() {
    AddressDataService.delete(this.state.currentAddress.id)
      .then((response) => {
        console.log(response.data);
        this.props.router.navigate("/addresses");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentAddress } = this.state;

    return (
      <div>
        {currentAddress ? (
          <div className="edit-form">
            <h4>Address</h4>
            <form>
              <div className="form-group">
                <label htmlFor="FormControlSelectEstado">Estado</label>
                <select
                  className="form-control"
                  id="FormControlSelectEstado"
                  onChange={this.onChangeEstado}
                  value={currentAddress.estado}
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
                  value={currentAddress.municipio}
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
                  value={currentAddress.cp}
                  onChange={this.onChangeCP}
                  name="cp"
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteAddress}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateAddress}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Address);
