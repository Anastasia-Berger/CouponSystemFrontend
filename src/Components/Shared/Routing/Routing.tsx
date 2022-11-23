import { Route, Routes } from "react-router-dom";
import App from "../../../App";
import About from "../../Pages/About/About";
import Credits from "../../Pages/Credits/Credits";
import Home from "../../Pages/Home/Home";
import Page404 from "../Page404/Page404";
import "./Routing.css";
import AddCoupon from "../../CouponSystem/CouponArea/AddCoupon/AddCoupon";
import CompaniesList from "../../CouponSystem/CompanyArea/CompaniesList/CompaniesList";
import AddCompany from "../../CouponSystem/AdminArea/Company/AddCompany/AddCompany";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import PurchaseCoupon from "../../CouponSystem/CustomerArea/PurchaseCoupon/PurchaseCoupon";
import CustomerDetails from "../../CouponSystem/CustomerArea/CustomerDetails/CustomerDetails";
import AddCustomer from "../../CouponSystem/AdminArea/Customer/AddCustomer/AddCustomer";
import UpdateCustomer from "../../CouponSystem/AdminArea/Customer/UpdateCustomer/UpdateCustomer";
import DeleteCustomer from "../../CouponSystem/AdminArea/Customer/DeleteCustomer/DeleteCustomer";
import CustomersList from "../../CouponSystem/CustomerArea/CustomersList/CustomersList";
import UpdateCompany from "../../CouponSystem/AdminArea/Company/UpdateCompany/UpdateCompany";
import DeleteCompany from "../../CouponSystem/AdminArea/Company/DeleteCompany/DeleteCompany";
import CompanyDetails from "../../CouponSystem/CompanyArea/CompanyDetails/CompanyDetails";
import UpdateCoupon from "../../CouponSystem/CouponArea/UpdateCoupon/UpdateCoupon";
import DeleteCoupon from "../../CouponSystem/CouponArea/DeleteCoupon/DeleteCoupon";
import CustomerCoupons from "../../CouponSystem/CustomerArea/CustomerCoupons/CustomerCoupons";
import CompanyCoupons from "../../CouponSystem/CompanyArea/CompanyCoupons/CompanyCoupons";
import CouponsList from "../../CouponSystem/CouponArea/CouponsList/CouponsList";
import CategoryList from "../../CouponSystem/CouponArea/CategoryList/CategoryList";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>

                {/* GENERAL PATH */}

                <Route path='/' element={<App />} />
                <Route path='/home' element={<Home />} />
                <Route index element={<Home />} />


                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/logout' element={<Logout />} />

                <Route path='/admin/home' element={<Home />} />
                <Route path='/companies/home' element={<Home />} />
                <Route path='/customers/home' element={<Home />} />

                <Route path='/allCoupons' element={<CouponsList />} />
                <Route path='/allCoupons/:category' element={<CategoryList />} />

                <Route path='/about' element={<About />} />
                <Route path='/credits' element={<Credits />} />
                <Route path='/*' element={<Page404 />} />

                {/* ADMIN FUNCTIONAL PATH */}

                <Route path='/admin/companies' element={<CompaniesList />} />
                <Route path='/admin/customers' element={<CustomersList />} />
                <Route path='/admin/coupons' element={<CouponsList />} />

                <Route path='/admin/companies/details/:id' element={<CompanyDetails />} />
                <Route path='/admin/customers/details/:id' element={<CustomerDetails />} />

                <Route path='/admin/companies/add' element={<AddCompany />} />
                <Route path='/admin/customers/add' element={<AddCustomer />} />

                <Route path='/admin/companies/edit/:id' element={<UpdateCompany />} />
                <Route path='/admin/customers/edit/:id' element={<UpdateCustomer />} />

                <Route path='/admin/companies/delete/:id' element={<DeleteCompany />} />
                <Route path='/admin/customers/delete/:id' element={<DeleteCustomer />} />

                {/* COMPANY FUNCTIONAL PATH */}

                <Route path='/companies/details' element={<CompanyDetails />} />

                <Route path='/companies/coupons' element={<CompanyCoupons />} />

                <Route path='/companies/coupons/add' element={<AddCoupon />} />
                <Route path='/companies/coupons/edit/:id' element={<UpdateCoupon />} />
                <Route path='/companies/coupons/delete/:id' element={<DeleteCoupon />} />

                {/* CUSTOMER FUNCTIONAL PATH */}
                

                <Route path='/customers/all' element={<CouponsList />} />
                
                <Route path='/customers/purchase/:id' element={<PurchaseCoupon />} />

                <Route path='/customers/details' element={<CustomerDetails />} />
                <Route path='/customers/:id/coupons' element={<CustomerCoupons />} />

                {/* COUPONS GENERAL SORT */}

                {/* <Route path='/coupons/getCouponByCategory' element={<CouponsByCategory />} />
                <Route path='/coupons/getCouponByPrice' element={<CouponsByPrice />} /> */}

            </Routes>
        </div>
    );
}

export default Routing;
