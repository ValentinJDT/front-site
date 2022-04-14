import {Helmet} from "react-helmet-async";
import {useContext, useState} from "react";
import AuthContext from "../contexts/AuthContext";
import AuthAPI from "../services/AuthAPI";
import {Link} from "react-router-dom";

const Connection = (props) => {
    const [connect, setConnect] = useState(false);

    const [canLookPass, setLookPass] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const context = useContext(AuthContext);

    const handleSubmit = async e => {
        e.preventDefault();

        const token = await AuthAPI.logIn(username, password);
        localStorage.setItem("token", token);
        context.setAuthentication(true);
        props.history.replace("/");
    }

    return (
        <>
            <>
                <Helmet>
                    <title>Se connecter | Afterworks</title>
                </Helmet>
            </>

            <div className="container">
                <h4 className={"m-3"}>Veuillez vous connecter</h4>

                <form onSubmit={handleSubmit} className={"mx-auto"} style={{width: "70%"}}>
                    <div>
                        <label htmlFor="username"
                               className="form-label">Username </label>
                        <input type="text"
                               className="form-control"
                               placeholder="Saisir votre email"
                               id="username"
                               value={username}
                               onChange={e => setUsername(e.target.value)}/>
                    </div>

                    <div className="mb-3">

                        <label htmlFor="password" className="form-label">Mot de passe </label>

                        <div className="input-group mb-3">
                            <input type={!canLookPass ? "password" : "text"}
                                   className="form-control"
                                   id="password"
                                   value={password}
                                   onChange={e => setPassword(e.target.value)}/>
                            <button className="btn btn-outline-secondary" type="button" id="button-addon1"
                                    onClick={() => setLookPass(!canLookPass)}>
                                👁
                            </button>
                        </div>


                    </div>

                    <button type="submit" className="btn btn-primary">Connexion</button>
                </form>
            </div>
            <div className={"text-center"}>
                <Link to={"/register"}>Je n'ai pas de compte</Link>
            </div>


        </>
    );
}

export default Connection;
