import axios from "axios";

function accessToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.accessToken) {
    console.log(true);
    return user.accessToken;
  } else {
    console.log(false);
    return "";
  }
}

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + accessToken(),
  },
});
