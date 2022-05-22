import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import AuthAPI from "../services/AuthAPI";
import { Link } from "react-router-dom";

const Connection = (props) => {
  const title = "Se connecter";

  const [error, setError] = useState(false);

  const [canLookPass, setLookPass] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await AuthAPI.logIn(username, password);
      localStorage.setItem("token", token);
      context.setAuthentication(true);
      props.history.replace("/");
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  return (
    <>
      <>
        <Helmet>
          <title>{title} | Afterworks</title>
        </Helmet>
      </>

      <div className="container">
        <h4 className={"m-3"}>Veuillez vous connecter</h4>

        <form
          onSubmit={handleSubmit}
          className={"mx-auto"}
          style={{ width: "55%" }}
        >
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Identifiant
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Adresse e-mail"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mot de passe
            </label>
            <div className="input-group mb-3">
              <input
                type={!canLookPass ? "password" : "text"}
                className="form-control"
                id="password"
                value={password}
                placeholder={"Saisissez votre mot de passe"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon1"
                onClick={() => setLookPass(!canLookPass)}
              >
                👁
              </button>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              L'identifiant ou le mot de passe est incorrect.
            </div>
          )}

          <button type="submit" className="btn btn-primary">
            Connexion
          </button>
        </form>
      </div>
      <div className={"text-center"}>
        <Link to={"/register"}>Je n'ai pas de compte</Link>
      </div>
    </>
  );
};

export default Connection;
