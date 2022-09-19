import { Link } from "react-router-dom";
import CustomLink from "../../Shared/CustomLink/CustomLink";
import SocialMedia from "../../Shared/SocialMedia/SocialMedia";
import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
            <div className="author-name"> &copy; BergerAnastasia</div>
            <SocialMedia />
            <div>                        
                <Link to="about">About  </Link>
                |
                <Link to="credits">  Credits</Link>
            </div>
        </div>
    );
}

export default Footer;
