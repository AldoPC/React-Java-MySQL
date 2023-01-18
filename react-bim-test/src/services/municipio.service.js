import http from "../common/http";

class AddressDataService {
  async get(id) {
    const response = await http.get(`/municipios/${id}`);
    return response.data;
  }
}

export default new AddressDataService();
