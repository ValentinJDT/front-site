import {Helmet} from "react-helmet-async";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../contexts/AuthContext";
import {Link} from "react-router-dom";
import uuid from "react-uuid";
import UserAPI from "../../services/UserAPI";

const HomePanel = () => {
    const title = "Panel administratif";
    const [isLoaded, setLoaded] = useState(false);

    const [roles, setRoles] = useState([]);

    const context = useContext(AuthContext);

    const fetchRoles = async () => {
        try {
            const data = await UserAPI.getRoles();
            setRoles(data);
            setLoaded(true);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchRoles();
    }, []);


    const access = roles.map(role => {
        const _grantedRoutes = context.grantedRoutes.filter(route => !route.home && !route.hide && route.power === role.power).map(route => {
            if(context.power >= route.power) {
                return (<span key={uuid()}><Link className="btn btn-outline-primary my-2" style={{width: "100%"}}
                                                 to={route.path}>{route.name}</Link><br/></span>);
            } else {
                return <span key={uuid()} className={"btn btn-outline-secondary my-2 disabled"}>{route.name}</span>;
            }
        });
        
        return (
            <ul className="list-group m-1" style={{width: "25%"}}>
                <li className="list-group-item list-group-item-secondary">{role.nom} ({role.power})</li>
                <li className="list-group-item">{_grantedRoutes}</li>
            </ul>
        );
    });

    return (
        <>

            <div>
                <Helmet>
                    <title>{title} | Afterwork</title>
                </Helmet>
            </div>

            <>

                <h4 className={"m-3"}>{title}</h4>

                {
                    (isLoaded && (
                        <div className="d-flex justify-content-evenly flex-wrap m-1">
                            {access}
                        </div>
                    ) || (
                        <div className="d-flex justify-content-evenly flex-wrap m-3" style={{height: "50vh"}}>
                            <div className={"text-center my-auto"}>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </>
        </>

    )
}

export default HomePanel;
