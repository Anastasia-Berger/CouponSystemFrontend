import { FiUser } from "react-icons/fi";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <header className="Header">
            {/* User */}
            <a href="">
                <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-User-interface-those-icons-lineal-those-icons-2.png" />
            </a>
            <AuthMenu />
        </header>
    );
}

export default Header;
