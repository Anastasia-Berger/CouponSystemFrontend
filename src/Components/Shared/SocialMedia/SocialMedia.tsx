import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import "./SocialMedia.css";

function SocialMedia(): JSX.Element {
    return (
        <div className="SocialMedia">
            {/* GitHub */}
            <a href="https://github.com/Anastasia-Berger">
                {/* <img src="https://img.icons8.com/nolan/44/github.png" /> */}
                <FiGithub size={30} />
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/anastasia-berger/">
                {/* <img src="https://img.icons8.com/nolan/44/linkedin-circled.png" /> */}
                <FiLinkedin size={30}/>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/my.fullstack.story/">
                {/* <img src="https://img.icons8.com/nolan/44/instagram-new.png" /> */}
                <FiInstagram size={30}/>
            </a>
        </div>
    );
}

export default SocialMedia;
