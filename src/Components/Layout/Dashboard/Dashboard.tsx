import "./Dashboard.css";
import CustomLink from "../../Shared/CustomLink/CustomLink";
import Logo from "../../Shared/Logo/Logo";
import TotalCoupons from "../../CouponSystem/Totals/TotalCuopons/TotalCoupons";
import TotalCompanies from "../../CouponSystem/Totals/TotalCompanies/TotalCompanies";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { useEffect, useState } from "react";
import store from "../../../Redux/store";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import notify, { ErrMsg } from "../../../Services/Notification";
import globals from "../../../Services/Globals";
import Character from "../../Shared/Character/Character";
import TotalCustomers from "../../CouponSystem/Totals/TotalCustomers/TotalCustomers";
import { BsHouse, BsShop } from "react-icons/bs";
import { FiGift, FiTag, FiUsers } from "react-icons/fi";

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
                <><nav className="Navbar">

                    <CustomLink to="admin/home">
                        <div className="nav-item">
                            <BsHouse size={20} className='react-icons' />
                            <span>Home</span>
                        </div>
                    </CustomLink>

                    <CustomLink to="details">
                        <FiGift size={20} className='react-icons' />
                        <span>Profile</span>
                    </CustomLink>

                    <CustomLink to="coupons">
                        <div className="nav-item">
                            <FiGift size={20} className='react-icons' />
                            <span>Coupons / <TotalCoupons /></span>
                        </div>
                    </CustomLink>

                </nav>
                </>) : (<></>)}

            {company ? (
                <>
                    <nav className="Navbar">

                        <CustomLink to="admin/home">
                            <div className="nav-item">
                                <BsHouse size={20} className='react-icons' />
                                <span>Home</span>
                            </div>
                        </CustomLink>

                        <CustomLink to="companies/details">
                            <FiGift size={20} className='react-icons' />
                            <span>Profile</span>
                        </CustomLink>

                        <CustomLink to="companies/coupons">
                            <div className="nav-item">
                                <FiGift size={20} className='react-icons' />
                                <span>Coupons / <TotalCoupons /></span>
                            </div>
                        </CustomLink>

                    </nav>
                </>) : (<></>)}

            {admin ? (
                <>
                    <nav className="Navbar">

                        <CustomLink to="admin/home">
                            <div className="nav-item">
                                <BsHouse size={20} className='react-icons' />
                                <span>Home</span>
                            </div>
                        </CustomLink>

                        <CustomLink to="admin/companies">
                            <div className="nav-item">
                                <BsShop size={20} className='react-icons' />
                                <span>Companies / <TotalCompanies /></span>
                            </div>
                        </CustomLink>

                        <CustomLink to="admin/coupons">
                            <div className="nav-item">
                                <FiGift size={20} className='react-icons' />
                                <span>Coupons / <TotalCoupons /></span>
                            </div>
                        </CustomLink>

                        <CustomLink to="admin/customers">
                            <div className="nav-item">
                                <FiUsers size={20} className='react-icons' />
                                <span>Customers / <TotalCustomers /></span>
                            </div>
                        </CustomLink>

                    </nav>
                </>) : (<></>)
            }


            {/* Custom Illustration */}
            <Character />
        </div >
    );
}

export default Dashboard;
