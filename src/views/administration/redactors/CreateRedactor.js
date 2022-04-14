import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";
import React from "react";
import uuid from "react-uuid";
import UserAPI from "../../../services/UserAPI";

const CreateRedactor = (props) => {
    const title = "Créer un rédacteur";

    const idRole = "2";

    // 8272124e-4c1f-43df-980f-b736fbb0bb3b

    const handleEmployee = async () => {
        try {
            await UserAPI.createEmployee(
                getValueOf("Email"),
                getValueOf("Password"),
                getValueOf("Firstname"),
                getValueOf("Lastname"),
                getValueOf("Address"),
                getValueOf("City"),
                getValueOf("ZipCode"),
                idRole
            );

            await props.history.push("/panel/redactors");

        } catch (e) {
            console.log(e);
        }

    }

    const getValueOf = (name) => {
        return document.getElementById("input" + name).value;
    }

    const inputs = [
        {
            name: "Email",
            label: "Adresse mail",
            type: "text"
        }, {
            name: "Password",
            label: "Mot de passe",
            type: "password"
        }, {
            name: "Firstname",
            label: "Prénom",
            type: "text"
        }, {
            name: "Lastname",
            label: "Nom",
            type: "text"
        }, {
            name: "Address",
            label: "Adresse",
            type: "text"
        }, {
            name: "City",
            label: "Ville",
            type: "text"
        }, {
            name: "ZipCode",
            label: "Code postal",
            type: "text"
        }
    ];

    const _inputs = inputs.map(input => (
        <>
            <label key={uuid()} htmlFor={"input" + input.name} className="form-label mt-4">{input.label}</label>
            <input key={uuid()} type={input.type} className="form-control" id={"input" + input.name} placeholder={input.label}/>
        </>
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
                        <li className="breadcrumb-item"><Link to={"/panel/redactors"}>Modifier les rédacteurs</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{title}</li>
                    </ol>
                </nav>

                <h4 className={"m-3"}>{title}</h4>

                <div className={"my-5 mx-auto"} style={{width: "70%"}}>

                    {_inputs}

                    <button type="button" className="btn btn-outline-secondary my-4"
                            onClick={handleEmployee}>Enregistrer
                    </button>

                </div>
            </>
        </>
    )
}

export default CreateRedactor;
