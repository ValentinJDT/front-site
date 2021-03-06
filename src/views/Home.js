import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import RedacAPI from "../services/RedacAPI";
import parse from "html-react-parser";
import showdown from "showdown";
import cafe from "../images/cafe-home-2.jpg";

const Home = (props) => {
  const [article, setArticle] = useState({});
  const [isLoaded, setLoaded] = useState(false);

  const converter = new showdown.Converter();

  useEffect(() => {
    (async () => {
      try {
        const articles = await RedacAPI.getArticles();
        const last = articles.sort(
          (a, b) =>
            new Date(a.dateCreation).getTime() -
            new Date(b.dateCreation).getTime()
        )[articles.length - 1];
        setArticle(last);
        setLoaded(true);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

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

  return (
    <>
      <Helmet>
        <title>Accueil | Afterworks</title>
      </Helmet>
      <>
        <div>
          <h1 className="text-center mt-2 mb-5">Afterwork</h1>
        </div>

        <div className="my-5">
          <img src={cafe} alt="coffee" className="mw-100" />
        </div>

        <h3 className="mt-5 mb-4">
          <span className="badge badge-success bg-success">Nouveauté</span> Vous
          avez peut-être manqué notre dernier article !
        </h3>
        {(!isLoaded && (
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
                  <li className="list-group-item">
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
                    <br />
                    Rubrique <strong>{article.idRubrique.titre}</strong>
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

export default Home;
