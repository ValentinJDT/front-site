import {BrowserRouter, Switch, Route, withRouter} from "react-router-dom";
import AuthContext from "./contexts/AuthContext";
import {HelmetProvider} from 'react-helmet-async';

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// Views
import Home from "./views/Home";
import NotFoundError from "./views/errors/NotFoundError";
import Products from "./views/Products";
import ProductDetail from "./views/ProductDetail";
import Connection from "./views/Connection";
import Register from "./views/Register";
import CreateArticle from "./views/administration/articles/CreateArticle";
import CreateRubric from "./views/administration/articles/CreateRubric";
import Dev from "./views/administration/dev/dev";
import EditArticle from "./views/administration/articles/EditArticle";
import HomePanel from "./views/administration/HomePanel";
import Redactors from "./views/administration/redactors/Redactors";
import Articles from "./views/administration/articles/Articles";

import {useEffect, useState} from "react";
import AuthAPI from "./services/AuthAPI";
import jwtDecode from "jwt-decode";
import GrantedRoute from "./components/routes/GrantedRoute";
import uuid from "react-uuid";
import EditRubric from "./views/administration/articles/EditRubric";
import CreateRedactor from "./views/administration/redactors/CreateRedactor";
import EditRedactor from "./views/administration/redactors/EditRedactor";
import AuthenticatedRoute from "./components/routes/AuthenticatedRoute";
import MyAccount from "./views/MyAccount";


function App() {


    const [isAuthenticated, setAuthentication] = useState(AuthAPI.isAuthenticated());

    const [power, setPower] = useState();

    useEffect(() => {
        if(isAuthenticated) {
            const token = localStorage.getItem("token");
            const payload = jwtDecode(token);
            setPower(payload.power);

        } else if(power !== 0) {
            setPower(0);
            console.log("Reset")
        }

    }, [isAuthenticated]);

    const grantedRoutes = [
        {
            name: "Panel de modification des rédacteurs",
            path: "/panel/redactors",
            power: 10,
            component: Redactors,
            hide: false,
            home: false
        },
        {
            name: "Créer un rédacteur",
            path: "/panel/create-redactor",
            power: 10,
            component: CreateRedactor,
            hide: false,
            home: false
        },
        {
            name: "Modifier un rédacteur",
            path: "/panel/edit-redactor/:redactor",
            power: 10,
            component: EditRedactor,
            hide: true,
            home: false
        },
        {
            name: "Panel de modification des articles",
            path: "/panel/articles",
            power: 2,
            component: Articles,
            hide: false,
            home: false
        },
        {
            name: "Modifier un article",
            path: "/panel/edit-article/:article",
            power: 2,
            component: EditArticle,
            hide: true,
            home: false
        },
        {
            name: "Rédiger un article",
            path: "/panel/article",
            power: 2,
            component: CreateArticle,
            hide: false,
            home: false
        },
        {
            name: "Modifier une rubrique",
            path: "/panel/edit-rubric/:rubric",
            power: 2,
            component: EditRubric,
            hide: true,
            home: false
        },
        {
            name: "Créer une rubrique",
            path: "/panel/rubric",
            power: 2,
            component: CreateRubric,
            hide: false,
            home: false
        },
        {
            name: "Créer un produit",
            path: "/panel/product",
            power: 10,
            component: CreateRubric,
            hide: false,
            home: false
        },
        {
            name: "Gérer les produits",
            path: "/panel/products",
            power: 10,
            component: CreateRubric,
            hide: false,
            home: false
        },
        {
            name: "Panel administratif",
            path: "/panel/home",
            power: 2,
            component: HomePanel,
            hide: true,
            home: true
        },
        {
            name: "Dev",
            path: "/panel/dev",
            power: 0,
            component: Dev,
            hide: false,
            home: false
        }
    ];

    const contextValues = {
        isAuthenticated: isAuthenticated,
        setAuthentication: setAuthentication,
        power: power,
        setPower: setPower,
        grantedRoutes: grantedRoutes
    }

    const NavBarWithRouter = withRouter(NavBar);
    const FooterWithRouter = withRouter(Footer);

    return (
        <div className="App">
            <HelmetProvider>
                <AuthContext.Provider value={contextValues}>
                    <BrowserRouter>
                        <NavBarWithRouter/>
                        <div className={"container pt-5"} style={{minHeight: "calc(100vh - 210px)"}}>
                            <Switch>
                                <Route path={"/"} exact component={Home}/>
                                <Route path={"/products"} exact component={Products}/>
                                <Route path={"/product/:product"} exact component={ProductDetail}/>
                                <Route path={"/login"} exact component={Connection}/>
                                <Route path={"/register"} exact component={Register}/>
                                <AuthenticatedRoute path={"/personal-account"} component={MyAccount}/>

                                {
                                    grantedRoutes.map(route => <GrantedRoute key={uuid()} path={route.path}
                                                                             power={route.power}
                                                                             component={route.component}/>,)
                                }

                                <Route component={NotFoundError}/>
                            </Switch>
                        </div>
                        <FooterWithRouter/>
                    </BrowserRouter>
                </AuthContext.Provider>
            </HelmetProvider>
        </div>
    );
}

export default App;
