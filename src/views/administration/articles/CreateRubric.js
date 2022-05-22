import { Helmet } from "react-helmet-async";
import React, { useEffect, useState } from "react";
import RedacAPI from "../../../services/RedacAPI";
import { Link } from "react-router-dom";

const CreateRubric = (props) => {
  const title = "Créer une rubrique";

  const [rubrics, setRubrics] = useState([]);

  // Create rubric
  const handleRubric = async () => {
    const inputTitle = document.getElementById("inputTitle").value;
    const inputBody = document.getElementById("inputBody").value;

    try {
      if (rubrics.filter((rubric) => rubric.titre === inputTitle)[0])
        throw new Error("La rubrique existe déjà");

      await RedacAPI.createRubric(inputTitle, inputBody);

      props.history.push("/panel/articles");
    } catch (e) {
      // Catch error
      console.log(e);
    }
  };

  const fetchRubrics = async () => {
    try {
      const data = await RedacAPI.getRubrics();
      setRubrics(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRubrics();
  }, []);

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
            <li className="breadcrumb-item">
              <Link to={"/panel/home"}>Panel administratif</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={"/panel/articles"}>Modifier les articles</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        <h4 className={"m-3"}>{title}</h4>

        <div className={"mt-5 mx-auto"} style={{ width: "70%" }}>
          <label htmlFor="inputTitle" className="form-label mt-4">
            Titre de la rubrique
          </label>
          <input
            className="form-control"
            id="inputTitle"
            placeholder="Titre de la rubrique"
          />

          <label htmlFor="inputBody" className="form-label mt-4">
            Description
          </label>
          <textarea
            className="form-control"
            id="inputBody"
            placeholder="Description de la rubrique..."
          />

          <button
            type="button"
            className="btn btn-outline-secondary my-4"
            onClick={handleRubric}
          >
            Enregistrer
          </button>
        </div>
      </>
    </>
  );
};

export default CreateRubric;
