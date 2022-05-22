import axios from "../config/axios";

const getRoles = () => axios.get("/roles").then(r => r.data);

const getEmployees = () => axios.get("/employees").then(r => r.data);

const createEmploye = (
    email,
    password,
    firstname,
    lastname,
    address,
    city,
    zip_code,
    idRole) => axios.post("/employees", {
    email: email,
    password: btoa(password),
    firstname: firstname,
    lastname: lastname,
    address: address,
    city: city,
    zip_code: zip_code,
    idRole: idRole
}).then(r => r.data);

const updateEmploye = (
    uuid,
    email,
    firstname,
    lastname,
    address,
    city,
    zip_code,
    image,
    idRole
) => {
    axios.put("/employees/" + uuid, {
        email: email,
        firstname: firstname,
        lastname: lastname,
        address: address,
        city: city,
        zip_code: zip_code,
        image: image || "",
        idRole: idRole
    }).then(r => r.data)
}

const getRedactors = () => axios.get("/employees/role/2").then(r => r.data);

const getEmployee = () => axios.get("/employees").then(r => r.data);

const getEmploye = (uuid) => axios.get("/employees/" + uuid).then(r => r.data);

const setEmployePassword = (
    uuid,
    password
) => axios.put("/employees/set-password/" + uuid, {
    password: btoa(password)
}).then(r => r.data);

const removeEmploye = (uuid) => axios.delete("/employees/" + uuid).then(r => r.data);

const getClient = (uuid) => axios.get("/clients/" + uuid).then(r => r.data);

const createClient = (
    email,
    password,
    firstname,
    lastname,
    address,
    city,
    zip_code,
    phone,
    newsletter) => axios.post("/clients", {
    email: email,
    password: btoa(password),
    firstname: firstname,
    lastname: lastname,
    address: address,
    city: city,
    zip_code: zip_code,
    phone: phone,
    newsletter: newsletter
}).then(r => r.data);

const setClientPassword = (
    uuid,
    password
) => axios.put("/clients/set-password/" + uuid, {
    password: btoa(password)
}).then(r => r.data);

const changeClientNewsletter = (uuid) => axios.put("/clients/newsletter/" + uuid).then(r => r.data);

export default {getEmployees, getEmployee, getEmploye, getRedactors, createEmploye, updateEmploye, removeEmploye,
    getRoles, setEmployePassword, getClient, createClient, setClientPassword, changeClientNewsletter};
