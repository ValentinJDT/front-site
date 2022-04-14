import {Redirect, Route} from "react-router-dom";
import AuthAPI from "../../services/AuthAPI";

const GrantedRoute = ({path, power, component}) => {
    const actualPower = (AuthAPI.isAuthenticated() ? AuthAPI.getPayload()["power"] : 0);

    return (actualPower >= power) ?
        <Route path={path} exact component={component}/>
        :
        <Redirect to={"/"}/>;
}

export default GrantedRoute;
