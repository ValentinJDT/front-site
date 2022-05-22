import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import RedacAPI from "../../../services/RedacAPI";
import ClampLines from "react-clamp-lines";
import { Converter } from "showdown";
import parse from "html-react-parser";
import uuid from "react-uuid";

const Articles = () => {
  const title = "Modifier les articles";
  const [isLoaded, setLoaded] = useState(false);

  const [rubrics, setRubrics] = useState([]);
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const data = await RedacAPI.getArticles();
      setArticles(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchRubrics = async () => {
    try {
      await fetchArticles();

      const data = await RedacAPI.getRubrics();
      setRubrics(data);

      setLoaded(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRubrics();
  }, []);

  // Showndown Converter for html to md
  const converter = new Converter();

  const _rubrics = rubrics.map((rubric) => {
    const _articles = articles
      .filter((article) => article.idRubrique.idRubrique === rubric.idRubrique)
      .map((article) => {
        const employe = article.idEmploye;

        const date = () => {
          const tempDate = new Date(article.dateCreation);
          return (
            tempDate.getDate() +
            "/" +
            (tempDate.getMonth() +
            1) +
            "/" +
            tempDate.getFullYear() +
            " à " +
            tempDate.getHours() +
            "h" +
            (tempDate.getMinutes() > 9
              ? tempDate.getMinutes()
              : "0" + tempDate.getMinutes())
          );
        };

        const content = converter
          .makeHtml(article.contenu)
          .replace(/<[^>]*>?/gm, "");

        return (
          <Link
            to={"/panel/edit-article/" + article.idArticle}
            className={"text-decoration-none"}
          >
            <div
              className={"row my-3"}
              style={{ maxWidth: "100%" }}
              key={uuid()}
            >
              <div className={"col"}>
                <ul className="list-group">
                  <li className="list-group-item">
                    <h5>
                      <strong>{article.titre}</strong>
                    </h5>
                    <ClampLines
                      text={content}
                      lines={3}
                      ellipsis={"..."}
                      buttons={false}
                      id={article.idArticle}
                    />

                    {/*ReactHtmlParser(converter.makeHtml(content))*/}
                  </li>
                  <li className="list-group-item">
                    De{" "}
                    <strong>
                      {employe.prenom} {employe.nom}{" "}
                    </strong>{" "}
                    <br />
                    Le <strong>{date()}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </Link>
        );
      });

    return (
      <div className="col mx-4">
        <div className="row">
          <h5>
            {" "}
            <Link
              className={"link-secondary"}
              style={{ textDecoration: "unset" }}
              to={"/panel/edit-rubric/" + rubric.idRubrique}
            >
              {rubric.titre}
            </Link>
          </h5>
          <hr style={{ maxWidth: "95%" }} />
        </div>

        {_articles}

        <div className="row text-center">
          <Link
            className={"btn btn-outline-secondary mx-auto m-1"}
            style={{ width: "25%" }}
            to={"/panel/article"}
          >
            +
          </Link>
        </div>
      </div>
    );
  });

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
            <li className="breadcrumb-item active" aria-current="page">
              Modifier les articles
            </li>
          </ol>
        </nav>

        <h4 className={"m-3"}>{title}</h4>

        {(isLoaded && (
          <div className="row m-3">
            {_rubrics}
            <div className="col">
              <Link className="btn btn-outline-secondary" to={"/panel/rubric"}>
                Créer une rubrique
              </Link>
            </div>
          </div>
        )) || (
          <div
            className="d-flex justify-content-evenly flex-wrap m-3"
            style={{ height: "50vh" }}
          >
            <div className={"text-center my-auto"}>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default Articles;
