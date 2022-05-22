import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import UserAPI from "../services/UserAPI";

const Register = (props) => {
  const title = "S'enregistrer";
  const [canLookPass, setLookPass] = useState(false);
  const [canLookConfirmPass, setLookConfirmPass] = useState(false);

  const [isLoaded, setLoaded] = useState(true);
  const [error, setError] = useState();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(null);

    (async () => {
      try {
        if (password !== confirmPassword) {
          setError(
            <div class="alert alert-danger mt-3" role="alert">
              Erreur : Les mots de passe ne correspondent pas
            </div>
          );
          return;
        }

        if (!password || !confirmPassword) {
          setError(
            <div class="alert alert-danger mt-3" role="alert">
              Erreur : Veuillez compléter correctement les champs
            </div>
          );
          return;
        }

        setLoaded(false);

        const data = await UserAPI.createClient(
          email,
          password,
          firstname,
          lastname,
          address,
          city,
          zipCode,
          phone,
          newsletter
        );

        props.history.replace("/login");
      } catch (e) {
        console.log(e);

        if (e.toJSON().status == 401) {
          setError(
            <div class="alert alert-danger mt-3" role="alert">
              Erreur : L'identifiant existe déjà
            </div>
          );
        } else {
          setError(
            <div class="alert alert-danger mt-3" role="alert">
              Erreur : Une erreur est survenu lors de la création du compte
            </div>
          );
        }
      }

      setLoaded(true);
    })();
  };

  return (
    <>
      <>
        <Helmet>
          <title>{title} | Afterworks</title>
        </Helmet>
      </>

      <div className="container">
        <h4 className={"m-3"}>Veuillez entrer vos informations</h4>

        <form
          onSubmit={handleSubmit}
          className={"mx-auto"}
          style={{ width: "55%" }}
        >
          <div className="mb-3">
            <label htmlFor="username" className="form-label ">
              Identifiant
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Adresse e-mail"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-start">
            <div className="mb-3 me-4">
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
                  required
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

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Confirmer votre mot de passe
              </label>
              <div className="input-group">
                <input
                  type={!canLookConfirmPass ? "password" : "text"}
                  className="form-control"
                  id="password"
                  value={confirmPassword}
                  placeholder={"Re-saisissez votre mot de passe"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon1"
                  onClick={() => setLookConfirmPass(!canLookConfirmPass)}
                >
                  👁
                </button>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-start">
            <div className="mb-3 me-4">
              <label htmlFor="firstname" className="form-label">
                Prénom
              </label>
              <input
                type={"text"}
                className="form-control"
                id="firstname"
                value={firstname}
                placeholder={"Saisissez votre prénom"}
                onChange={(e) => setFirstname(e.target.value)}
                pattern={"[a-zA-Z]*"}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Nom
              </label>
              <input
                type={"text"}
                className="form-control"
                id="lastname"
                value={lastname}
                placeholder={"Saisissez votre nom"}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                pattern={"[a-zA-Z]*"}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Adresse
            </label>
            <input
              type={"text"}
              className="form-control"
              id="address"
              value={address}
              placeholder={"Saisissez votre adresse"}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-start">
            <div className="mb-3 me-4">
              <label htmlFor="city" className="form-label">
                Ville
              </label>
              <input
                type={"text"}
                className="form-control"
                id="city"
                value={city}
                placeholder={"Saisissez votre ville"}
                onChange={(e) => setCity(e.target.value)}
                pattern={"[a-zA-Z]*"}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="zipcode" className="form-label">
                Code postal
              </label>
              <input
                type={"text"}
                className="form-control"
                id="zipcode"
                value={zipCode}
                placeholder={"Saisissez votre code postal"}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (!Number.isNaN(value)) {
                    setZipCode(e.target.value);
                  }
                }}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Téléphone
            </label>
            <input
              type={"tel"}
              className="form-control"
              id="phone"
              value={phone}
              placeholder={"Saisissez votre numéro de téléphone"}
              pattern="[0-9]{10}"
              onChange={(e) => {
                const value = Number(e.target.value);
                if (!Number.isNaN(value)) {
                  setPhone(e.target.value);
                }
              }}
              required
            />
          </div>

          <div className="mb-3">
            <Form.Check
              type={"checkbox"}
              id={`default-checkbox`}
              label={`Je souhaite recevoir les nouvelles actualités par courriel`}
              value={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
            />
          </div>

          {!!error && error}

          {(!isLoaded && (
            <div className="text-center mt-3">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )) || (
            <button type="submit" className="btn btn-primary">
              S'enregistrer
            </button>
          )}
        </form>
      </div>
      <div className={"text-center"}>
        <Link to={"/login"}>J'ai déjà un compte</Link>
      </div>
    </>
  );
};

export default Register;
