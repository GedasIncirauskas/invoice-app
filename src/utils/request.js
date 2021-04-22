import axios from "axios";

const instance = axios.create({
  baseURL: "http://631901.s.dedikuoti.lt:9999/api",
});

export default instance;
