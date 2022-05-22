import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import UserAPI from "../../../services/UserAPI";

const CreateRedactor = (props) => {
  const title = "Créer un employé";

  const idRole = "2";

  const [roles, setRoles] = useState([]);

  // 8272124e-4c1f-43df-980f-b736fbb0bb3b

  useEffect(() => {
    (async () => {
      try {
        const data = await UserAPI.getRoles();
        setRoles(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const handleEmploye = async () => {
    try {
      await UserAPI.createEmploye(
        getValueOf("Email"),
        getValueOf("Password"),
        getValueOf("Firstname"),
        getValueOf("Lastname"),
        getValueOf("Address"),
        getValueOf("City"),
        getValueOf("ZipCode"),
        getValueOf("Role")
      );

      await props.history.push("/panel/employee");
    } catch (e) {
      console.log(e);
    }
  };

  const getValueOf = (name) => {
    return document.getElementById("input" + name).value;
  };

  const _roles = roles.map((role) => (
    <option value={role.idRole}>{role.nom + " (" + role.power + ")"}</option>
  ));

  const inputs = [
    {
      name: "Email",
      label: "Adresse mail",
      type: "text",
    },
    {
      name: "Password",
      label: "Mot de passe",
      type: "password",
    },
    {
      name: "Firstname",
      label: "Prénom",
      type: "text",
    },
    {
      name: "Lastname",
      label: "Nom",
      type: "text",
    },
    {
      name: "Address",
      label: "Adresse",
      type: "text",
    },
    {
      name: "City",
      label: "Ville",
      type: "text",
    },
    {
      name: "ZipCode",
      label: "Code postal",
      type: "text",
    },
  ];

  const _inputs = inputs.map((input) => (
    <>
      <label
        key={uuid()}
        htmlFor={"input" + input.name}
        className="form-label mt-4"
      >
        {input.label}
      </label>
      <input
        key={uuid()}
        type={input.type}
        className="form-control"
        id={"input" + input.name}
        placeholder={input.label}
      />
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
            <li className="breadcrumb-item">
              <Link to={"/panel/home"}>Panel administratif</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={"/panel/employee"}>Modifier les employés</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        <h4 className={"m-3"}>{title}</h4>

        <div className={"my-5 mx-auto"} style={{ width: "55%" }}>
          <div>
            <label htmlFor={"inputRole"} className="form-label mt-4">
              Rôle
            </label>
            <select
              class="form-select"
              aria-label="Liste des roles"
              id={"inputRole"}
            >
              {_roles}
            </select>
          </div>

          {_inputs}

          <button
            type="button"
            className="btn btn-outline-secondary my-4"
            onClick={handleEmploye}
          >
            Enregistrer
          </button>
        </div>
      </>
    </>
  );
};

export default CreateRedactor;
