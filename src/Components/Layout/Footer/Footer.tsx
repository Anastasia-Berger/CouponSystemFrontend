import SocialMedia from "../../Shared/SocialMedia/SocialMedia";
import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
            <div className="author-name"> &copy; BergerAnastasia</div>
            <SocialMedia />
        </div>
    );
}

export default Footer;
