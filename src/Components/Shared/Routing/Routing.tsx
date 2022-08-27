import { Route, Routes } from "react-router-dom";
import App from "../../../App";
import About from "../../Pages/About/About";
import CouponsList from "../../CouponSystem/CouponsList/CouponsList";
import Credits from "../../Pages/Credits/Credits";
import Home from "../../Pages/Home/Home";
import Page404 from "../Page404/Page404";
import "./Routing.css";
import AddCoupon from "../../CouponSystem/AddCoupon/AddCoupon";
import CompaniesList from "../../CouponSystem/CompaniesList/CompaniesList";
import AddCompany from "../../CouponSystem/AddCompany/AddCompany";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/home' element={<Home />} />
                <Route index element={<Home />} /> 

                <Route path='/coupons' element={<CouponsList />} />
                <Route path='/coupons/add' element={<AddCoupon />} />

                <Route path='/companies' element={<CompaniesList />} />
                <Route path='/companies/add' element={<AddCompany />} />

                <Route path='/about' element={<About />} />
                <Route path='/credits' element={<Credits />} />
                <Route path='/*' element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default Routing;
