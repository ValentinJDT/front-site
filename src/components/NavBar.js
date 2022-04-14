import {
    Navbar,
    Container,
    Nav,
    NavDropdown
} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../contexts/AuthContext";
import jwtDecode from "jwt-decode";
import AuthAPI from "../services/AuthAPI";

const NavBar = (props) => {

    const context = useContext(AuthContext);

    const path = props.location.pathname;

    let payload = "";
    let adminRoute = "";
    if(context.isAuthenticated) {
        payload = jwtDecode(localStorage.getItem("token"));
        adminRoute = context.grantedRoutes.filter(route => route.home)[0];
    }

    const disconnect = () => {
        AuthAPI.logOut();
        context.setAuthentication(false);
        props.history.push("/login");
    }

    return (
        <Navbar className={"nav"} expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className={"nav-link" + (path === "/" || path === "/home" ? " active" : "")} to={"/"}>Accueil</Link>
                        <Link className={"nav-link" + (path.includes("/products") ? " active" : "")} to={"/products"}>Produits</Link>
                        <Link className={"nav-link" + (path.includes("/commands") ? " active" : "")} to={"/commands"}>Commandes</Link>
                        <Link className={"nav-link" + (path.includes("/information") ? " active" : "")} to={"/information"}>Informations</Link>
                    </Nav>
                    <Nav>
                        {
                            (context.isAuthenticated && (
                                <NavDropdown title={payload["firstname"] + " " + payload["lastname"]} id="basic-nav-dropdown">
                                    <Link className={"dropdown-item"} to={"/personal-account"}>Mon compte</Link>


                                    {context.power < 0 && (
                                        <Link className={"dropdown-item"} to={"/personal-comments"}>Mes commentaires</Link>
                                    ) || (
                                        <Link className={"dropdown-item"} to={adminRoute.path}>{adminRoute.name}</Link>
                                    )}

                                    <NavDropdown.Divider />
                                    <NavDropdown.Item className={"dropdown-item"} onClick={disconnect}>Se déconnecter</NavDropdown.Item >
                                </NavDropdown>
                            )) || (
                                <NavDropdown title="Compte" id="basic-nav-dropdown">
                                    <Link className={"dropdown-item"} to={"/login"}>Se connecter</Link>
                                    <Link className={"dropdown-item"} to={"/register"}>S'inscrire</Link>
                                </NavDropdown>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
