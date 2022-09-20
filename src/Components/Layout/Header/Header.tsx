import AppName from "../../Shared/AppName/AppName";
import Clock from "../../Shared/Clock/Clock";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <header className="Header">
            <div className="welcome">
                <span >Welcome to </span><AppName /><span >!</span>
            </div>
            <Clock />
        </header>
    );
}

export default Header;
