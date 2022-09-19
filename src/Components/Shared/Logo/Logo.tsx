import "./Logo.css";
import logo from './../../../logo.svg';
import AppName from "../AppName/AppName";

function Logo(): JSX.Element {
    return (
        <div className="Logo">
            <img src={logo} className="App-logo" alt="logo" />
            <AppName/>
        </div>
    );
}

export default Logo;
