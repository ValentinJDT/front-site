import UserAPI from "../../../services/UserAPI";
import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";
import uuid from "react-uuid";
import employee from '../../../images/default-employee.jpg';
import {logDOM} from "@testing-library/react";

const EditRedactor = (props) => {
    const title = "Modifier un rédacteur";

    const uuidRedactor = props.match.params.redactor;

    const [isLoaded, setLoaded] = useState(false);

    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [image, setImage] = useState("");

    const handleResetPassword = async () => {
        try {
            await UserAPI.setEmployeePassword(uuidRedactor, "secret");
        } catch(e) {
            console.log(e);
        }
    }

    const handleSaveRedactor = async () => {
        try {
            await UserAPI.updateEmployee(
                uuidRedactor,
                email,
                firstname,
                lastname,
                address,
                city,
                zipCode,
                image,
                2
            );

            await props.history.push("/panel/redactors");
        } catch(e) {
            console.log(e);
        }
    }

    const handleRemoveRedactor = async () => {
        try {
            await UserAPI.removeEmploye(uuidRedactor);
            await props.history.push("/panel/redactors");
        } catch(e) {
            console.log(e);
        }
    }

    const fetchRedactor = async () => {

        try {
            const data = await UserAPI.getEmployee(uuidRedactor);

            setEmail(data.email);
            setLastname(data.nom);
            setFirstname(data.prenom);
            setAddress(data.adresse);
            setCity(data.ville);
            setZipCode(data.cp);
            setImage(data.image);

            setLoaded(true);
        } catch(e) {
            console.log(e);
        }
    }

    function setBase64Image(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
    }

    useEffect(() => {
        fetchRedactor();
    }, []);


    const inputs = [
        {
            name: "Email",
            label: "Adresse mail",
            type: "text",
            set: setEmail,
            get: email
        }, {
            name: "Firstname",
            label: "Prénom",
            type: "text",
            set: setFirstname,
            get: firstname
        }, {
            name: "Lastname",
            label: "Nom",
            type: "text",
            set: setLastname,
            get: lastname
        }, {
            name: "Address",
            label: "Adresse",
            type: "text",
            set: setAddress,
            get: address
        }, {
            name: "City",
            label: "Ville",
            type: "text",
            set: setCity,
            get: city
        }, {
            name: "ZipCode",
            label: "Code postal",
            type: "text",
            set: setZipCode,
            get: zipCode
        }
    ];


    const _inputs = inputs.map(input => (
        <div key={uuid()}>
            <label htmlFor={"input" + input.name} className="form-label mt-4">{input.label}</label>
            <input type={input.type} className="form-control" id={"input" + input.name}
                   placeholder={input.label} value={input.get} onChange={e => input.set(e.target.value)}/>
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
                        <li className="breadcrumb-item"><Link to={"/panel/redactors"}>Modifier les rédacteurs</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">{title}</li>
                    </ol>
                </nav>

                <h4 className={"m-3"}>{title}</h4>


                <div className={"mt-4 mb-3 mx-auto placeholder-glow"} style={{width: "70%"}}>
                    <label htmlFor="inputEmail" className="form-label mt-4">Adresse mail</label>
                    <input type="text"
                           className={"form-control" + (isLoaded ? "" : " placeholder")}
                           id="inputEmail"
                           placeholder={(isLoaded ? "Adresse mail" : "")}
                           value={email} onChange={() => ""} disabled/>

                    <label htmlFor="inputFirstname" className="form-label mt-4">Prénom</label>
                    <input type="text"
                           className={"form-control" + (isLoaded ? "" : " placeholder")}
                           id="inputFirstname"
                           placeholder={(isLoaded ? "Prénom" : "")}
                           value={firstname} onChange={e => setFirstname(e.target.value)}/>

                    <label htmlFor="inputLastname" className="form-label mt-4">Nom d'usage</label>
                    <input type="text"
                           className={"form-control" + (isLoaded ? "" : " placeholder")}
                           id="inputLastname"
                           placeholder={(isLoaded ? "Nom" : "")}
                           value={lastname} onChange={e => setLastname(e.target.value)}/>

                    <label htmlFor="inputAddress" className="form-label mt-4">Adresse de résidence</label>
                    <input type="text"
                           className={"form-control" + (isLoaded ? "" : " placeholder")}
                           id="inputAddress"
                           placeholder={(isLoaded ? "Adresse" : "")}
                           value={address} onChange={e => setAddress(e.target.value)}/>

                    <label htmlFor="inputCity" className="form-label mt-4">Ville d'habitation</label>
                    <input type="text"
                           className={"form-control" + (isLoaded ? "" : " placeholder")}
                           id="inputCity"
                           placeholder={(isLoaded ? "Ville" : "")}
                           value={city} onChange={e => setCity(e.target.value)}/>

                    <label htmlFor="inputZipCode" className="form-label mt-4">Code postal</label>
                    <input type="text"
                           className={"form-control" + (isLoaded ? "" : " placeholder")}
                           id="inputZipCode"
                           placeholder={(isLoaded ? "Code postal" : "")}
                           value={zipCode} onChange={e => setZipCode(e.target.value)}/>

                    <div className="mt-4 row row-cols-lg-auto align-items-center justify-content-center" style={{width: "100%"}}>
                        <div className="col">
                            <img src={image || employee} className={"img-thumbnail"} alt={"Profil de l'employe"} style={{height: "10vh", maxWidth:"auto"}}/>
                        </div>
                        <div className="col">
                            <input type="file" className="form-control" id="inputFile" onChange={(e) => {
                                if(e.target.files.length) {
                                    setBase64Image(e.target.files[0])
                                } else {
                                    setImage("");
                                }
                            }}/>
                            <button type="button" className="btn btn-outline-danger mt-3" onClick={() => {
                                setImage("");
                            }}>Réinitialiser l'image</button>
                        </div>
                    </div>

                    <button type="button" className="btn btn-outline-secondary my-4 me-3" onClick={handleSaveRedactor}>
                        Enregistrer
                    </button>

                    <button type="button" className="btn btn-outline-warning my-4 me-3" onClick={handleResetPassword}>
                        Réinitialiser le mot de passe
                    </button>

                    <button type="button" className="btn btn-outline-danger my-4" onClick={handleRemoveRedactor}>
                        Supprimer le compte
                    </button>
                </div>

            </>
        </>


    );

}

export default EditRedactor;
