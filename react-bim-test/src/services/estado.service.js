import http from "../common/http";

class EstadoDataService {
  async getAll() {
    const response = await http.get("/estados");
    return response.data;
  }
}

export default new EstadoDataService();
