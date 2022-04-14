import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import UserAPI from "../services/UserAPI";
import AuthAPI from "../services/AuthAPI";

const MyAccount = () => {
    const title = "Mon compte";

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mail, setMail] = useState("");

    const handleChangePassword = async () => {
        try {

            if(password !== confirmPassword)
                throw new Error("Les mots de passe ne correspondent pas");

            const payload = AuthAPI.getPayload();
            const uuid = payload["uuid"];

            await UserAPI.setEmployeePassword(uuid, password);

        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const payload = AuthAPI.getPayload();
        setMail(payload["username"]);
    });

    return (
        <>
            <>
                <Helmet>
                    <title>Se connecter | Afterworks</title>
                </Helmet>
            </>

            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/"}>Accueil</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{title}</li>
                </ol>
            </nav>

            <h4 className={"m-3"}>{title}</h4>

            <div className={"mt-2 mx-auto"}>
                <label htmlFor="inputPassword" className="form-label mt-4">Mot de passe</label>
                <input className="form-control"
                       id="inputPassword"
                       placeholder={"Mot de passe"}
                       value={password} onChange={e => setPassword(e.target.value)}/>

                <label htmlFor="inputConfirmPassword" className="form-label mt-4">Confirmation de mot de passe</label>
                <input className="form-control"
                       id="inputConfirmPassword"
                       placeholder={"Confirmation de mot de passe"}
                       value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>

                <button type="button" className="btn btn-outline-secondary my-4 me-3"
                        onClick={handleChangePassword}>Enregistrer
                </button>

            </div>

            <div className={"mt-2 mx-auto"}>
                <label htmlFor="inputMail" className="form-label mt-4">Abonnement à la newletter</label>
                <input className="form-control"
                       id="inputMail"
                       placeholder={"Adresse mail"}
                       value={mail} onChange={e => setMail(e.target.value)}/>

                <button type="button" className="btn btn-outline-success my-4 me-3">S'abonner</button>
                <button type="button" className="btn btn-outline-danger my-4 me-3">Se désabonner</button>
            </div>
        </>
    );
}

export default MyAccount;
