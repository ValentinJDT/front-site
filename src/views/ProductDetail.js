import { Helmet } from "react-helmet-async";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import ProductAPI from "../services/ProductAPI";
import coffee from "../images/default-coffee.jpg";
import parse from "html-react-parser";
import showdown from "showdown";
import RedacAPI from "../services/RedacAPI";
import AuthContext from "../contexts/AuthContext";

const ProductDetail = (props) => {
  const title = "Fiche détails";
  const context = useContext(AuthContext);

  const idProduct = props.match.params.product;
  const [isLoaded, setLoaded] = useState(false);
  const [product, setProduct] = useState([]);

  const [comments, setComments] = useState([]);
  const [selectedDeclinaison, setSelectedDeclinaison] = useState({});

  const [commentTitle, setCommentTitle] = useState("");
  const [commentContent, setCommentContent] = useState("");

  const [declinaisons, setDeclinaisons] = useState([]);
  const [size, setSize] = useState(1);
  const [tva, setTva] = useState(0);

  const fetchProduct = async () => {
    try {
      const data = await ProductAPI.getProduct(idProduct);
      setProduct(data);
      setTva(data["tva"]["pourcentage"]);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchDeclinaison = async () => {
    try {
      const data = await ProductAPI.getDeclinaisonByProduct(idProduct);
      setDeclinaisons(data);
      setLoaded(true);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchComments = async () => {
    try {
      const data = await RedacAPI.getCommentsByProduct(idProduct);
      setComments(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const postComment = async (e) => {
    e.preventDefault();

    try {
      console.log(
        selectedDeclinaison.idProduitDeclinaison,
        commentTitle,
        commentContent
      );

      const data = await RedacAPI.createComment(
        selectedDeclinaison.idProduitDeclinaison,
        commentTitle,
        commentContent
      );
      setComments([...comments, data]);
    } catch (e) {
      console.log(e);
    }
  };

  const converter = new showdown.Converter();

  useEffect(() => {
    fetchDeclinaison();
    fetchProduct();
    fetchComments();
  }, []);

  useEffect(() => {
    console.log(selectedDeclinaison);
  }, [selectedDeclinaison]);

  const _comments = comments
    .sort((a, b) => a.date - b.date)
    .map((v) => {
      const date = () => {
        const tempDate = new Date(v.date);
        console.log(tempDate.getMonth());

        return (
          tempDate.getDate() +
          "/" +
          (tempDate.getMonth() + 1) +
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
        <div className="border p-3 rounded my-3" style={{ width: "55%" }}>
          <h6>
            <strong>
              {v.idProduitDeclinaison.idDeclinaison.nom} - {v.titre}
            </strong>
          </h6>
          <p>{v.description}</p>
          <p>
            De{" "}
            <strong>
              {v.idClient.prenom} {v.idClient.nom}
            </strong>
            <br />
            Le <strong>{date()}</strong>
          </p>
        </div>
      );
    });

  return (
    <>
      <div>
        <Helmet>
          <title>{title} | Afterworks</title>
        </Helmet>
      </div>

      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/"}>Accueil</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={"/products"}>Produits</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.nom}
            </li>
          </ol>
        </nav>

        <h4 className={"m-4"}>
          {title} : {product.nom}
        </h4>

        <div className="row mt-5" style={{ width: "100%" }}>
          {(!product.nom && (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )) || (
            <>
              <div className="col-5 m-3">
                <img
                  style={{ maxWidth: "100%" }}
                  src={product.image || coffee}
                  alt="product"
                />
              </div>
              <div className="col m-3">
                <div className="row">
                  <h5>Description : </h5>
                  {(product.description &&
                    parse(converter.makeHtml("" + product.description))) ||
                    "Aucune description disponible"}
                </div>

                <div className="row mt-3">
                  <h5>Prix :</h5>
                  {product.prixUnitaire * (1 + tva / 100)} Euro
                </div>

                {(declinaisons.length && isLoaded && (
                  <form className="row mt-4">
                    <h5>Les disponibilités :</h5>
                    {declinaisons.map((value, key) => (
                      <div className="form-check" key={key}>
                        <input
                          checked={key === 0}
                          type="radio"
                          value={value.idDeclinaison.idDeclinaison}
                          name="declinaison"
                          onChange={(e) => {
                            if (e.target.checked) {
                              const declinaison = declinaisons.filter(
                                (v) =>
                                  v.idDeclinaison.idDeclinaison ==
                                  e.target.value
                              )[0];
                              setSelectedDeclinaison(declinaison);
                            }
                          }}
                        />{" "}
                        {value.idDeclinaison.nom}
                      </div>
                    ))}

                    <div>
                      <div
                        className="input-group my-3"
                        style={{ width: "18%" }}
                      >
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={(e) => {
                            if (size - 1 > 0) setSize(size - 1);
                          }}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="form-control text-center"
                          value={size}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            if (!Number.isNaN(value) && value <= 50) {
                              setSize(value);
                            }
                          }}
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={(e) => {
                            if (size + 1 <= 50) setSize(size + 1);
                          }}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </form>
                )) ||
                  (!declinaisons.length && !isLoaded && (
                    <div className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )) || (
                    <div className="mt-4">
                      <span className="badge bg-danger text-bg-danger">
                        Non disponible à l'achat
                      </span>
                    </div>
                  )}
              </div>
              <div>
                <h5>Commentaires : ({comments.length})</h5>
                {context.isAuthenticated && (
                  <form
                    className="border p-3 rounded"
                    style={{ width: "55%" }}
                    onSubmit={postComment}
                  >
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Titre
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Titre du commentaire"
                        id="title"
                        value={commentTitle}
                        onChange={(e) => setCommentTitle(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="content" className="form-label">
                        Contenu
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Contenu du commentaire"
                        id="content"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                      />
                    </div>
                    <button className="btn btn-outline-secondary" type="submit">
                      Envoyer
                    </button>
                  </form>
                )}

                <div>{_comments}</div>
              </div>
            </>
          )}
        </div>
      </>
    </>
  );
};

export default ProductDetail;
