import axios from "../config/axios";

const getProducts = () => axios.get("/products").then(r => r.data);

const getProductsByCategory = (idCategory) => axios.get("/products/category/" + idCategory).then(r => r.data);

const getProduct = (id) => axios.get("/products/" + id).then(r => r.data);

const getDeclinaisonByProduct = (idProduct) => axios.get("/declinaisons/product/" + idProduct).then(r => r.data);

export default { getProducts, getProductsByCategory, getProduct, getDeclinaisonByProduct };
