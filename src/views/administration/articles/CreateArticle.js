import {Helmet} from "react-helmet-async";
import React, {useEffect, useState} from "react";
import RedacAPI from "../../../services/RedacAPI";
import {Link} from "react-router-dom";

const CreateArticle = (props) => {
    const title = "Rédiger un article";

    console.log(props.match.params)

    const [rubrics, setRubrics] = useState([]);

    // Create article
    const handleArticle = async () => {
        const inputRubric = document.getElementById("list").value;
        const inputTitle = document.getElementById("inputTitle").value;
        const inputBody = document.getElementById("inputBody").value;

        try {
            if (!rubrics.filter(rubric => rubric.titre === inputRubric)[0])
                throw new Error("La rubrique n'existe pas");

            const rubric = rubrics.filter(rubric => rubric.titre === inputRubric)[0];

            await RedacAPI.createArticle(rubric.idRubrique, inputTitle, inputBody);

            await props.history.push("/panel/articles");
        } catch (e) {
            console.log(e);
        }
    }

    const fetchRubrics = async () => {
        try {
            const data = await RedacAPI.getRubrics();
            setRubrics(data);
        } catch (e) {
            console.log(e);
        }
    }

    const handleRubric = async () => {
        const inputRubric = document.getElementById("list").value;
        try {
            await RedacAPI.createRubric(inputRubric, "");
            await fetchRubrics();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchRubrics();
    }, []);

    const _rubrics = rubrics.map(rubric => (
        <option key={rubric.idRubrique} value={rubric.titre}>{rubric.description}</option>
    ));

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

                <div className={"mt-5 mx-auto"} style={{width: "70%"}}>

                    <div className={"mb-3"}>
                        <label htmlFor="list" className="form-label">Rubrique</label>
                        <div className="input-group">
                            <input className="form-control" list="datalistOptions" id="list"
                                   placeholder="Rechercher ici..."/>

                            <datalist id="datalistOptions">
                                {_rubrics}
                            </datalist>

                            <button className="btn btn-outline-secondary" type="button" id="button-addon2"
                                    onClick={handleRubric} title="Besoin d'une nouvelle rubrique ? Créer la rubrique">+
                            </button>
                        </div>
                    </div>

                    <label htmlFor="inputTitle" className="form-label mt-4">Titre de l'article</label>
                    <input className="form-control" id="inputTitle"
                           placeholder="Titre de l'article"/>

                    <label htmlFor="inputBody" className="form-label mt-4">Contenu</label>
                    <textarea className="form-control" id="inputBody" placeholder="Contenu de l'article..."/>

                    <button type="button" className="btn btn-outline-secondary my-4"
                            onClick={handleArticle}>Enregistrer
                    </button>
                </div>

            </>
        </>

    )
}

export default CreateArticle;
