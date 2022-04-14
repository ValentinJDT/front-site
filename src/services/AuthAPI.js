import axios from "../config/axios";
import jwtDecode from "jwt-decode";

const register = (email, firstname, lastname, password) => axios.post("/register", {
    "username": email,
    "firstname": firstname,
    "lastname": lastname,
    "password": password
}).then((resp) => resp.data);


const logIn = (username,password) => {
    return axios
        .post("/login_check", {"username": username, "password": password})
        .then(response => response.data.token);
}

const logOut = () => {
    localStorage.removeItem("token");
}

const isAuthenticated = () => {
    const token = localStorage.getItem("token");

    if(token) {
        const payload = getPayload();

        const verif = payload.exp >= new Date().getTime()/1000;

        if(!verif) {
            localStorage.removeItem("token");
        }

        return verif;
    }
    return false;
}

const getPayload = () => {
    const token = localStorage.getItem("token");
    return jwtDecode(token);
}

export default { register, logIn, logOut, isAuthenticated, getPayload };
