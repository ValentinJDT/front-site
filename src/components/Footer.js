import {Stack} from "react-bootstrap";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className={"--bs-gray-400 text-center "}>
            <Stack gap={3} className=" col-md-5 mx-auto">
                <div className="social mt-5">
                    <Link className={"mx-3"} to={""}><i className="icon ion-social-twitter"/></Link>
                    <Link className={"mx-3"} to={""}><i className="icon ion-social-facebook"/></Link>
                    <Link className={"mx-3"} to={""}><i className="icon ion-social-linkedin"/></Link>
                </div>

                <div>
                    <p>©2021 Afterwork </p>
                </div>
            </Stack>
        </footer>
    );
}

export default Footer;
