import * as url from '../../images/exclamation_icon.png';
import {Helmet} from "react-helmet-async";

const ServerError = () => {
    return (
        <>
            <Helmet>
                <title>Une erreur est survenue...</title>
            </Helmet>
            <div className={"p-5 container d-flex justify-content-evenly flex-wrap"} style={{height: "100%"}}>
                <div className={"mt-5"}>
                    <h2><img src={url.default} alt={"Not found icon"}/>Erreur 500</h2>
                    <h3>Un problème est survenu sur notre serveur...</h3>
                </div>
            </div>
        </>
    )
}

export default ServerError;
