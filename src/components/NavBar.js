import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import jwtDecode from "jwt-decode";
import AuthAPI from "../services/AuthAPI";
import RedacAPI from "../services/RedacAPI";

const NavBar = (props) => {
  const [rubrics, setRubrics] = useState([]);

  const context = useContext(AuthContext);
  const path = props.location.pathname;

  let payload = "";
  let adminRoute = "";
  if (context.isAuthenticated) {
    payload = jwtDecode(localStorage.getItem("token"));
    adminRoute = context.grantedRoutes.filter((route) => route.home)[0];
    console.log(payload);
  }

  const disconnect = () => {
    AuthAPI.logOut();
    context.setAuthentication(false);
    props.history.push("/login");
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await RedacAPI.getRubrics();
        setRubrics(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const _rubrics = rubrics.map((v, i) => (
    <Link className={"dropdown-item"} to={"/rubric/" + v.idRubrique} key={i}>
      {v.titre}
    </Link>
  ));

  return (
    <Navbar className={"nav"} expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              className={
                "nav-link" + (path === "/" || path === "/home" ? " active" : "")
              }
              to={"/"}
            >
              Accueil
            </Link>
            <NavDropdown title={"Les rubriques"} id="basic-nav-dropdown-2">
              {_rubrics}
            </NavDropdown>
            <Link
              className={
                "nav-link" + (path.includes("/products") ? " active" : "")
              }
              to={"/products"}
            >
              Produits
            </Link>
            <Link
              className={
                "nav-link" + (path.includes("/commands") ? " active" : "")
              }
              to={"/commands"}
            >
              Commandes
            </Link>
          </Nav>
          <Nav>
            {(context.isAuthenticated && (
              <NavDropdown
                title={payload["firstname"] + " " + payload["lastname"]}
                id="basic-nav-dropdown"
              >
                <Link className={"dropdown-item"} to={"/personal-account"}>
                  Mon compte
                </Link>

                {context.power > 1 && (
                  <Link className={"dropdown-item"} to={adminRoute.path}>
                    {adminRoute.name}
                  </Link>
                )}

                <NavDropdown.Divider />
                <NavDropdown.Item
                  className={"dropdown-item"}
                  onClick={disconnect}
                >
                  Se déconnecter
                </NavDropdown.Item>
              </NavDropdown>
            )) || (
              <NavDropdown title="Compte" id="basic-nav-dropdown">
                <Link className={"dropdown-item"} to={"/login"}>
                  Se connecter
                </Link>
                <Link className={"dropdown-item"} to={"/register"}>
                  S'inscrire
                </Link>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
