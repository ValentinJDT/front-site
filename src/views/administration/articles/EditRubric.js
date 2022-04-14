import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import RedacAPI from "../../../services/RedacAPI";


const EditRubric = (props) => {
    const title = "Modifier une rubrique";
    const [isLoaded, setLoaded] = useState();

    const idRubrique = props.match.params.rubric;

    const [titleRubric, setTitleRubric] = useState("");
    const [descriptionRubric, setDescriptionRubric] = useState("");

    const handleSaveRubric = async () => {
        try {
            if(!titleRubric)
                throw new Error("Il faut un titre");

            await RedacAPI.saveRubric(idRubrique, titleRubric, descriptionRubric || "");
            await props.history.push("/panel/articles");
        } catch(e) {
            console.log(e);
        }
    };

    const handleRemoveRubric = async () => {
        try {
            await RedacAPI.removeRubric(idRubrique);
            await props.history.push("/panel/articles");
        } catch(e) {
            console.log(e);
        }
    };

    const fetchRubric = async () => {
        try {
            const data = await RedacAPI.getRubric(idRubrique);

            setTitleRubric(data.titre);
            setDescriptionRubric(data.description);
            setLoaded(true);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchRubric();
    },[]);

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

                    <label htmlFor="inputTitle" className="form-label mt-4">Titre de la rubrique</label>
                    <input className={"form-control" + (isLoaded ? "" : " placeholder")}
                           id="inputTitle"
                           placeholder={isLoaded ? "Titre de la rubrique" : ""}
                           value={titleRubric} onChange={e => setTitleRubric(e.target.value)}/>

                    <label htmlFor="inputBody" className="form-label mt-4">Description</label>
                    <textarea className={"form-control" + (isLoaded ? "" : " placeholder")}
                              id="inputBody"
                              placeholder={isLoaded ? "Description de la rubrique..." : ""}
                              value={descriptionRubric} onChange={e => setDescriptionRubric(e.target.value)}/>

                    <button type="button" className="btn btn-outline-secondary my-4 me-3"
                            onClick={handleSaveRubric}>Enregistrer
                    </button>
                    <button type="button" className="btn btn-outline-danger my-4"
                            onClick={handleRemoveRubric}>Supprimer
                    </button>
                </div>

            </>
        </>
    );


}

export default EditRubric;
