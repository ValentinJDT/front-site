import {Helmet} from "react-helmet-async";
import UserAPI from "../../../services/UserAPI";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import employee from '../../../images/default-employee.jpg';

const Redactors = () => {
    const title = "Modifier les rédateurs";

    const [isLoaded, setLoaded] = useState(false);
    const [redactors, setRedactors] = useState([]);

    const fetchRedactors = async () => {
        try {
            const data = await UserAPI.getRedactors();
            setRedactors(data);
            setLoaded(true);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchRedactors();
    }, []);


    const _redactors = redactors.map(redactor => (
        <div key={redactor.uuid} className="card rounded-0" style={{height: "52vh"}}>
            <img src={redactor.image || employee} className="card-img-top img-fluid rounded-0 my-auto employee-image" alt="..."/>

            <div className="card-body text-center">
                <h5 className="card-title text-center">{redactor.prenom} {redactor.nom}</h5>

                <p className="card-text text-secondary text-center my-3">{redactor.role.nom}</p>

                <Link to={"/panel/edit-redactor/" + redactor.uuid} className="btn btn-outline-secondary mt-2">
                    Gérer l'employé
                </Link>
            </div>

        </div>
    ));

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
                        <li className="breadcrumb-item active" aria-current="page">{title}</li>
                    </ol>
                </nav>

                <h4 className={"m-3"}>{title}</h4>

                <div className="d-flex justify-content-evenly flex-wrap m-3" style={{height: "50vh"}}>
                    {
                        (isLoaded && (
                            _redactors
                        )) || (
                            <div className="text-center my-auto">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )
                    }
                </div>

            </>
        </>

    )
}

export default Redactors;
