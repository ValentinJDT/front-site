import { useEffect, useState } from "react";
import RedacAPI from "../services/RedacAPI";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import showdown from "showdown";

const ArticleDetail = (props) => {
  const title = "Détail d'un article";

  const idArticle = props.match.params.article;

  const [article, setArticle] = useState({});
  const [rubric, setRubric] = useState({});

  const converter = new showdown.Converter();

  useEffect(() => {
    (async () => {
      try {
        if (Number.isNaN(idArticle)) throw new Error("404 error");
        const data = await RedacAPI.getArticle(idArticle);
        setArticle(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [idArticle]);

  const date = () => {
    const tempDate = new Date(article.dateCreation);
    return (
      tempDate.getDate() +
      "/" +
      tempDate.getMonth() +
      1 +
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
            <li className="breadcrumb-item" aria-current="page">
              {(Object.keys(article).length && (
                <Link to={"/rubric/" + article.idRubrique.idRubrique}>
                  {article.idRubrique.titre}
                </Link>
              )) ||
                "Chargement..."}
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {(Object.keys(article).length && article.titre) || ""}
            </li>
          </ol>
        </nav>

        <h4 className={"m-3"}>{title}</h4>

        {(!Object.keys(article).length && (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )) || (
          <>
            <div className={"row p-3"} style={{ maxWidth: "100%" }}>
              <div className={"col"}>
                <ul className="list-group">
                  <li className="list-group-item" style={{ minHeight: "50%" }}>
                    <h4 className="text-center">
                      <strong>{article.titre}</strong>
                    </h4>
                    {parse(converter.makeHtml("" + article.contenu))}
                  </li>
                  <li className="list-group-item">
                    Écrit par{" "}
                    <strong>
                      {article.idEmploye.prenom} {article.idEmploye.nom}
                    </strong>
                    <br />
                    Le <strong>{date()}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </>
    </>
  );
};

export default ArticleDetail;
