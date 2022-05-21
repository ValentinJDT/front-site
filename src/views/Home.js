import { Helmet } from "react-helmet-async";
import { Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import RedacAPI from "../services/RedacAPI";

const Home = (props) => {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState({});
  const [isLoaded, setLoaded] = useState(false);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    (async () => {
      try {
        const articles = await RedacAPI.getArticles();
        setArticle(articles[getRandomInt(articles.length)]);
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
        <title>Accueil | Afterworks</title>
      </Helmet>
      <>
        {(!isLoaded && (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )) || (
          <>
            <h1 className="text-center">Afterwork</h1>

            <h3 className="mt-5 mb-2">
               Vous avez peut-être manqué :
            </h3>
            <div className={"row p-3"} style={{ maxWidth: "100%" }}>
              <div className={"col"}>
                <ul className="list-group">
                  <li className="list-group-item">
                    <h5>
                      <strong>{article.titre}</strong>
                    </h5>
                    {article.contenu}
                  </li>
                  <li className="list-group-item">
                    De{" "}
                    <strong>
                      {article.idEmploye.prenom} {article.idEmploye.nom}{" "}
                    </strong>{" "}
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

export default Home;
