import axios from "../config/axios";

const getRoles = () => axios.get("/roles").then(r => r.data);

const getEmployees = () => axios.get("/employees").then(r => r.data);

const createEmployee = (
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

const updateEmployee = (
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

const getEmployee = (uuid) => axios.get("/employees/" + uuid).then(r => r.data);

const setEmployeePassword = (
    uuid,
    password
) => axios.put("/employees/set-password/" + uuid, {
    password: btoa(password)
}).then(r => r.data);

const removeEmploye = (uuid) => axios.delete("/employees/" + uuid).then(r => r.data);

export default {getEmployees, getEmployee, getRedactors, createEmployee, updateEmployee, removeEmploye,
    getRoles, setEmployeePassword};
