import { FiUser } from "react-icons/fi";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <header className="Header">
            {/* User */}
            <a href="">
                {/* <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-User-interface-those-icons-lineal-those-icons-2.png" /> */}
                <FiUser size="30" color="#000000"/>
            </a>

        </header>
    );
}

export default Header;
