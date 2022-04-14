import axios from "../config/axios";

const createArticle = (rubric, title, content) => {
    axios.post("/articles", {
        idRubrique: rubric,
        title: title,
        content: content
    }).then(response => response);
}

const saveArticle = (idArticle, rubric, title, content) =>
    axios.put("/articles/" + idArticle, {
        idRubrique: rubric,
        title: title,
        content: content
    }).then(r => r.data);

const removeArticle = (idArticle) =>
    axios.delete("/articles/" + idArticle).then(r => r.data);

const getArticle = (idArticle) => axios.get("/articles/" + idArticle).then(resp => resp.data);

const getArticles = () => axios.get("/articles").then(resp => resp.data);

const createRubric = (title, description) =>
    axios.post("/rubrics", {
        title: title,
        description: description
    }).then(response => response.data);

const saveRubric = (idRubrique, title, description) =>
    axios.put("/rubrics/" + idRubrique, {
        title: title,
        description: description
    }).then(response => response.data);

const removeRubric = (idRubrique) => {
    axios.delete("/rubrics/" + idRubrique);
}

const getRubric = (idRubrique) => axios.get("/rubrics/" + idRubrique).then(resp => resp.data);

const getRubrics = () => axios.get("/rubrics", { params: { ignore_no_content: false } }).then(resp => resp.data);

const getRubricsWhoHasArticle = () => axios.get("/rubrics", { params: { ignore_no_content: true } }).then(r => r.data);

export default {
    createArticle, saveArticle, removeArticle, getArticle, getArticles,
    createRubric, saveRubric, removeRubric, getRubric, getRubrics, getRubricsWhoHasArticle
};
