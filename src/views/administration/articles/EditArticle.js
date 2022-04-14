import RedacAPI from "../../../services/RedacAPI";
import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";

const EditArticle = (props) => {
    const title = "Modifier un article";
    const [isLoaded, setLoaded] = useState(false);

    const idArticle = props.match.params.article;

    const [articleTitle, setArticleTitle] = useState("");
    const [articleContent, setArticleContent] = useState("");
    const [articleRubrique, setArticleRubrique] = useState(0);

    const [rubrics, setRubrics] = useState([]);

    // Save article
    const handleSaveArticle = async () => {
        try {
            if(!articleRubrique)
                throw new Error("Il faut une rubrique");

            const data = await RedacAPI.saveArticle(idArticle, articleRubrique, articleTitle, articleContent);

            await props.history.push("/panel/articles");
        } catch(e) {
            console.log("data2", e);
        }
    }

    // Remove article
    const handleRemoveArticle = async () => {
        try {
            await RedacAPI.removeArticle(idArticle);

            await props.history.push("/panel/articles");
        } catch(e) {
            console.log(e);
        }
    }

    const fetchArticle = async () => {
        try {
            const data = await RedacAPI.getArticle(idArticle);

            setArticleTitle(data.titre);
            setArticleContent(data.contenu);
            setArticleRubrique(data.idRubrique.idRubrique);

            setLoaded(true);
        } catch(e) {
            console.log(e);
        }
    }

    const fetchRubrics = async () => {
        try {
            const data = await RedacAPI.getRubrics();
            setRubrics(data);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchArticle();
        fetchRubrics();
    }, []);

    const _rubrics = rubrics.map(rubric => (
            <option key={rubric.idRubrique} value={rubric.idRubrique}>{rubric.titre}</option>
        )
    );

    return (
        <>
            <div>
                <Helmet>
                    <title>{title} | Afterwork</title>
                </Helmet>
            </div>

            <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={"/panel/home"}>Panel administratif</Link></li>
                        <li className="breadcrumb-item"><Link to={"/panel/articles"}>Modifier les articles</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{title}</li>
                    </ol>
                </nav>

                <h4 className={"m-3"}>{title}</h4>

                <div className={"mt-5 mx-auto placeholder-glow"} style={{width: "70%"}}>

                    <div className={"mb-3"}>
                        <label htmlFor="list" className="form-label">Rubrique</label>
                        <select className="form-select" id="list" value={articleRubrique} onChange={e => setArticleRubrique(e.target.value)}>
                            {_rubrics}
                        </select>
                    </div>

                    <label htmlFor="inputTitle" className="form-label mt-4">Titre de l'article</label>
                    <input className="form-control" id="inputTitle" placeholder="Titre de l'article"
                           value={articleTitle} onChange={e => setArticleTitle(e.target.value)}/>


                    <label htmlFor="inputBody" className="form-label mt-4">Contenu</label>
                    <textarea className="form-control" id="inputBody" placeholder="Contenu de l'article..."
                              value={articleContent} onChange={e => setArticleContent(e.target.value)}/>

                    <button type="button" className="btn btn-outline-secondary my-4 me-3"
                            onClick={handleSaveArticle}>Enregistrer
                    </button>

                    <button type="button" className="btn btn-outline-danger my-4"
                            onClick={handleRemoveArticle}>Supprimer
                    </button>
                </div>

            </>
        </>
    );

}

export default EditArticle;
