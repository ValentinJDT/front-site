import AuthContext from "../../contexts/AuthContext";
import {useContext} from "react";
import {Redirect, Route} from "react-router-dom";

const AuthenticatedRoute = ({path, component}) => {
    const {isAuthenticated} = useContext(AuthContext);

    return isAuthenticated ?
        <Route path={path} component={component}/>
        :
        <Redirect to={"login"}/>;
}

export default AuthenticatedRoute;
