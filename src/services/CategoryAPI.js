import axios from "../config/axios";

const getCategories = () => axios.get("/categories", { params: { ignore_no_content: false } }).then(r => r.data);

const getCategoriesWhoHasProducts = () => axios.get("/categories", { params: { ignore_no_content: true } }).then(r => r.data);

const getCategory = (id) => axios.get("/categories/" + id).then(r => r.data);

export default { getCategories, getCategory, getCategoriesWhoHasProducts };
