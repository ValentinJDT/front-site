import {Helmet} from "react-helmet-async";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ProductAPI from "../services/ProductAPI";
import parse from 'html-react-parser';
import coffee from '../images/default-coffee.jpg';
import showdown from "showdown";

const ProductDetail = (props) => {

    const title = "Fiche détails";

    const idProduct = props.match.params.product;
    const [product, setProduct] = useState([]);
    const [tva, setTva] = useState(0);

    const fetchProduct = async () => {
        try {
            const data = await ProductAPI.getProduct(idProduct);
            setProduct(data);
            setTva(data["tva"]["pourcentage"]);
        } catch(e) {
            console.log(e);
        }
    }

    const converter = new showdown.Converter();

    useEffect(() => fetchProduct(), []);

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
                        <li className="breadcrumb-item"><Link to={"/"}>Accueil</Link></li>
                        <li className="breadcrumb-item"><Link to={"/products"}>Produits</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{product.nom}</li>
                    </ol>
                </nav>

                <h4 className={"m-4"}>{title} : {product.nom}</h4>

                <div className="row mt-5" style={{width: "100%"}}>
                    <div className="col-5 m-3">
                        <img style={{maxWidth: "100%"}} src={product.image || coffee} />
                    </div>
                    <div className="col m-3">
                        <div className="row">
                            Description : <br/>
                            {parse(converter.makeHtml(product.description))}
                        </div>

                        <div className="row mt-4">
                            Prix : <br/>
                            {product.prixUnitaire*(1 + (tva/100))} €
                        </div>
                    </div>
                </div>
            </>
        </>
    );
}

export default ProductDetail;
