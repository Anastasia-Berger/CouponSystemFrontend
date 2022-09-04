import { Route, Routes } from "react-router-dom";
import App from "../../../App";
import About from "../../Pages/About/About";
import CouponsList from "../../CouponSystem/CompanyArea/Coupons/CouponsList/CouponsList";
import Credits from "../../Pages/Credits/Credits";
import Home from "../../Pages/Home/Home";
import Page404 from "../Page404/Page404";
import "./Routing.css";
import AddCoupon from "../../CouponSystem/CompanyArea/Coupons/AddCoupon/AddCoupon";
import CompaniesList from "../../CouponSystem/CompanyArea/Companies/CompaniesList/CompaniesList";
import AddCompany from "../../CouponSystem/AdminArea/AddCompany/AddCompany";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path='/' element={<App />} />

                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/logout' element={<Logout/>}/>
                
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
