import { Helmet } from "react-helmet-async";
import React, { useEffect, useState } from "react";
import ProductAPI from "../services/ProductAPI";
import { Link } from "react-router-dom";
import ClampLines from "react-clamp-lines";
import coffee from "../images/default-coffee.jpg";
import imgfond from "../images/imgfond.png";

import CategoryAPI from "../services/CategoryAPI";

const Products = () => {
  const title = "Liste des produits";

  const [products, setProducts] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const [categories, setCategories] = useState([]);

  const fetchProducts = async (category) => {
    try {
      let data;
      if (category && category !== "all") {
        data = await ProductAPI.getProductsByCategory(category);
      } else {
        data = await ProductAPI.getProducts();
      }

      setProducts(data);
      setLoaded(true);
    } catch (e) {
      console.log(e.response);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await CategoryAPI.getCategoriesWhoHasProducts();
      setCategories(data);
    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts("all");
  }, []);

  const _products = products.map((product) => {
    return (
      <Link
        key={product.idProduit}
        to={"/product/" + product.idProduit}
        className={"product-link mb-3"}
      >
        <div className="card rounded-0" style={{ maxWidth: "540px" }}>
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{product.nom}</h5>

                <p className="card-text">
                  Catégorie : {product.idCategorie.nom}
                </p>

                <div className="card-text">
                  <ClampLines
                    text={product.description.replace(/<[^>]*>?/gm, "")}
                    lines={1}
                    ellipsis={"..."}
                    buttons={false}
                    id={product.idProduit}
                  />
                </div>
                <p className="card-text">{product.prixUnitaire} €</p>
              </div>
            </div>

            <div className="col-md-4">
              <img
                src={product.image || coffee}
                className="img-fluid rounded-0 my-auto product-image"
                alt="..."
              />
            </div>
          </div>
        </div>
      </Link>
    );
  });

  const _categories = categories.map((category) => (
    <option value={category.idCategorie} key={category.idCategorie}>
      {category.nom} ({category.numProduits})
    </option>
  ));

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
              Produits
            </li>
          </ol>
        </nav>

        <h4 className={"m-3"}>Catalogue de nos produits</h4>

        <img
          src={imgfond}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
          alt={"Coffee"}
        />

        <h4 className={"my-3"}>{title}</h4>

        <div className={"mt-3"}>
          <select
            className="form-select form-select-sm d-inline"
            style={{ width: "auto" }}
            onChange={(e) => {
              setLoaded(false);
              fetchProducts(e.target.value);
            }}
            defaultValue={"all"}
          >
            <option value={"all"}>Tous les produits</option>
            {_categories}
          </select>
        </div>

        <div className="d-flex justify-content-evenly flex-wrap m-3">
          {(!isLoaded && !_products.length && (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )) ||
            (isLoaded && !_products.length && (
              <h5>Aucun produit n'est disponible dans cette catégorie</h5>
            )) ||
            _products}
        </div>
      </>
    </>
  );
};

export default Products;
