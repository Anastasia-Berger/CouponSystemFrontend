import "./Logo.css";
import logo from './../../../logo.svg';

function Logo(): JSX.Element {
    return (
        <div className="Logo">
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    );
}

export default Logo;
