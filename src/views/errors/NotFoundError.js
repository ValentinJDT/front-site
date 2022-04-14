import icon from '../../images/exclamation_icon.png';
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";

const NotFoundError = () => {
    return (
        <>
            <Helmet>
                <title>Une erreur est survenue...</title>
            </Helmet>
            <div className={"p-5 container d-flex justify-content-evenly flex-wrap"} style={{height: "100%"}}>
                <div className={"mt-5"}>
                    <h2><img src={icon} alt={"Not found icon"}/>Erreur 404</h2>
                    <h3>Nous n'arrivons pas à trouver votre page...</h3>
                    <h5><Link to={"/"}>Revenir à l'accueil</Link></h5>
                </div>
            </div>
        </>
    )
}

export default NotFoundError;
