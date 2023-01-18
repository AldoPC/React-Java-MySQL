import http from "../common/http";

class AddressDataService {
  getAll() {
    return http.get("/addresses");
  }

  getAllParse() {
    return http.get("/addressesParse");
  }

  get(id) {
    return http.get(`/addresses/${id}`);
  }

  create(data) {
    return http.post("/addresses", data);
  }

  update(id, data) {
    return http.put(`/addresses/${id}`, data);
  }

  delete(id) {
    return http.delete(`/addresses/${id}`);
  }
}

export default new AddressDataService();
