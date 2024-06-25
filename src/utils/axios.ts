import axios from "axios";

const instance = axios.create({
    baseURL: "https://www.datos.gov.co/resource"
});

export default instance;
