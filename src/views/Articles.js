import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import RedacAPI from "../services/RedacAPI";
import parse from "html-react-parser";
import showdown from "showdown";
import ClampLines from "react-clamp-lines";

const Articles = (props) => {
  const title = "Les articles";

  const idRubrique = props.match.params.rubric;

  const [rubric, setRubric] = useState({});
  const [articles, setArticles] = useState([]);

  const [error, setError] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setArticles([]);
    (async () => {
      try {
        if (Number.isNaN(idRubrique)) throw new Error("404");

        const data = await RedacAPI.getRubric(idRubrique);

        if (data == null) throw new Error("404");

        setRubric(data);
        console.log(idRubrique, data);
      } catch (e) {
        console.log(e);
        setError(true);
      }
    })();
  }, [idRubrique]);

  useEffect(() => {
    (async () => {
      try {
        if (Number.isNaN(idRubrique)) throw new Error("404");

        const data = await RedacAPI.getArticles();

        setArticles(
          data.filter(
            (v) => Number(v.idRubrique.idRubrique) === Number(idRubrique)
          )
        );

        setLoaded(true);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [rubric]);

  useEffect(() => {
    if (error) props.history.replace("/404");
  }, [error]);

  const converter = new showdown.Converter();

  const _articles = articles.map((article, i) => {
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
        key={article.idArticle}
        to={"/article/" + article.idArticle}
        className={"product-link mb-3"}
      >
        <div className="card rounded-0" style={{ width: "300px" }}>
          <div className="card-body">
            <h5 className="card-title text-center">{article.titre}</h5>

            <div className="card-text">
              <ClampLines
                text={content}
                lines={1}
                ellipsis={"..."}
                buttons={false}
                id={article.idArticle}
              />
            </div>
            <p className="card-text pt-4">
              Écrit par{" "}
              <strong>
                {employe.prenom} {employe.nom}{" "}
              </strong>{" "}
              <br />
              Le <strong>{date()}</strong>
            </p>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <>
      <Helmet>
        <title>{title} | Afterworks</title>
      </Helmet>
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/"}>Accueil</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Rubrique
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {rubric.titre || "Chargement..."}
            </li>
          </ol>
        </nav>

        <h4 className={"m-3"}>{title}</h4>

        <div className="d-flex justify-content-evenly flex-wrap m-3">
          {(!isLoaded && !_articles.length && (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )) ||
            (isLoaded && !_articles.length && (
              <h5>Aucun article n'est disponible dans cette rubrique</h5>
            )) ||
            _articles}
        </div>
      </>
    </>
  );
};

export default Articles;
