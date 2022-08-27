import "./Dashboard.css";
import CustomLink from "../../Shared/CustomLink/CustomLink";
import Logo from "../../Shared/Logo/Logo";
import Total from "../../CouponSystem/Total/Total";

function Dashboard(): JSX.Element {
    return (
        <div className="Dashboard">

            <div className="Dash-header">
                <div className="Logo">
                    <Logo />
                    <div className="App-name">
                        <span className="first">
                            Coupon
                        </span>
                        <span className="second">
                            Stock
                        </span>
                    </div>
                </div>
            </div>

            <nav className="Navbar">
                <CustomLink to="home">Home</CustomLink>
                <CustomLink to="about">About</CustomLink>
                <CustomLink to="coupons">Coupons (<Total/>)</CustomLink>
                <CustomLink to="companies">Companies</CustomLink>
                <CustomLink to="credits">Credits</CustomLink>
            </nav>

        </div>
    );
}

export default Dashboard;
