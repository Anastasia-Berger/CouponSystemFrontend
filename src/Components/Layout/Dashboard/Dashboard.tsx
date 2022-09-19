import "./Dashboard.css";
import CustomLink from "../../Shared/CustomLink/CustomLink";
import Logo from "../../Shared/Logo/Logo";
import TotalCoupons from "../../CouponSystem/Totals/TotalCuopons/TotalCoupons";
import TotalCompanies from "../../CouponSystem/Totals/TotalCompanies/TotalCompanies";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { useEffect, useState } from "react";
import store from "../../../Redux/store";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import { useNavigate } from "react-router-dom";
import notify, { ErrMsg } from "../../../Services/Notification";
import globals from "../../../Services/Globals";
import Character from "../../Shared/Character/Character";
import TotalCustomers from "../../CouponSystem/Totals/TotalCustomers/TotalCustomers";

function Dashboard(): JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user?.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    const [customer, setCustomer] = useState(
        store.getState().authReducer.user?.clientType === "CUSTOMER"
    );
    const [company, setCompany] = useState(
        store.getState().authReducer.user?.clientType === "COMPANY"
    );
    const [admin, setAdmin] = useState(
        store.getState().authReducer.user?.clientType === "ADMINISTRATOR"
    );


    useEffect(() => {
        return store.subscribe(() => {
            setCustomer(store.getState().authReducer.user?.clientType === "CUSTOMER");
            setCompany(store.getState().authReducer.user?.clientType === "COMPANY");
            setAdmin(store.getState().authReducer.user?.clientType === "ADMINISTRATOR");
        });
    }, []);

    return (
        <div className="Dashboard">

            <DashboardHeader />

            {customer ? (
                <>
                    <nav className="Navbar">
                        <CustomLink to="customer/home">Home</CustomLink>
                        <CustomLink to="coupons">Coupons(<TotalCoupons />)</CustomLink>
                        <CustomLink to="details">Profile</CustomLink>
                    </nav>
                </>
            ) : (<></>)}

            {company ? (
                <>
                    <nav className="Navbar">
                        <CustomLink to="companies/home">Home</CustomLink>
                        <CustomLink to="companies/details">Profile</CustomLink>
                        <CustomLink to="companies/:id/coupons">Coupons (<TotalCoupons />)</CustomLink>
                    </nav>
                </>
            ) : (<></>)}

            {admin ? (
                <>
                    <nav className="Navbar">
                        <CustomLink to="admin/home">Home</CustomLink>
                        <CustomLink to="admin/companies">Companies (<TotalCompanies />)</CustomLink>
                        <CustomLink to="admin/customers">Customers (<TotalCustomers />)</CustomLink>
                    </nav>
                </>
            ) : (<></>)}


            {/* Custom Illustration */}
            <Character />
        </div>
    );
}

export default Dashboard;
