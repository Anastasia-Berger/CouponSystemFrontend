import AppName from "../../Shared/AppName/AppName";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <header className="Header">
            <span className="welcome">Welcome to </span><AppName /><span className="welcome">!</span>
        </header>
    );
}

export default Header;
