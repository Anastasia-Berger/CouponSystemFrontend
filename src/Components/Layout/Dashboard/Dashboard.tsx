import "./Dashboard.css";
import CustomLink from "../../Shared/CustomLink/CustomLink";
import TotalCoupons from "../../CouponSystem/Totals/TotalCuopons/TotalCoupons";
import TotalCompanies from "../../CouponSystem/Totals/TotalCompanies/TotalCompanies";
import { useEffect, useState } from "react";
import store from "../../../Redux/store";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import notify, { ErrMsg } from "../../../Services/Notification";
import Character from "../../Shared/Character/Character";
import TotalCustomers from "../../CouponSystem/Totals/TotalCustomers/TotalCustomers";
import { BsGear, BsHouse, BsShop } from "react-icons/bs";
import { FiGift, FiTag, FiUser, FiUsers } from "react-icons/fi";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";

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
        store.getState().authReducer.user?.clientType === "CUSTOMER");
    const [company, setCompany] = useState(
        store.getState().authReducer.user?.clientType === "COMPANY");
    const [admin, setAdmin] = useState(
        store.getState().authReducer.user?.clientType === "ADMINISTRATOR");

    useEffect(() => {
        return store.subscribe(() => {
            setCustomer(store.getState().authReducer.user?.clientType === "CUSTOMER");
            setCompany(store.getState().authReducer.user?.clientType === "COMPANY");
            setAdmin(store.getState().authReducer.user?.clientType === "ADMINISTRATOR");
        });
    }, []);

    return (
        <div className="Dashboard">

            <AuthMenu />

            <nav className="Navbar">

                <CustomLink to="/home">
                    <div className="nav-item">
                        <BsHouse size={20} className='react-icons' />
                        <span>Home</span>
                    </div>
                </CustomLink>


                {customer ? (

                    <>

                        <CustomLink to="/allCoupons">
                            <div className="nav-item">
                                <FiGift size={20} className='react-icons' />
                                <span>All Coupons / <TotalCoupons /></span>
                            </div>
                        </CustomLink>

                        <CustomLink to="/customers/details">
                            <div className="nav-item">
                                <BsGear size={20} className='react-icons' />
                                <span>Profile</span>
                            </div>
                        </CustomLink>

                    </>) : (<></>)}

                {company ? (
                    <>

                        <CustomLink to="companies/coupons">
                            <div className="nav-item">
                                <FiGift size={20} className='react-icons' />
                                <span>Coupons / <TotalCoupons /></span>
                            </div>
                        </CustomLink>

                        <CustomLink to="companies/details">
                            <div className="nav-item">
                                <BsGear size={20} className='react-icons' />
                                <span>Profile</span>
                            </div>
                        </CustomLink>

                    </>) : (<></>)}

                {admin ? (
                    <>
                        <CustomLink to="/allCoupons">
                            <div className="nav-item">
                                <FiGift size={20} className='react-icons' />
                                <span>All Coupons / <TotalCoupons /></span>
                            </div>
                        </CustomLink>

                        <CustomLink to="admin/companies">
                            <div className="nav-item">
                                <BsShop size={20} className='react-icons' />
                                <span>Companies / <TotalCompanies /></span>
                            </div>
                        </CustomLink>


                        <CustomLink to="admin/customers">
                            <div className="nav-item">
                                <FiUsers size={20} className='react-icons' />
                                <span>Customers / <TotalCustomers /></span>
                            </div>
                        </CustomLink>

                    </>) : (<></>)
                }
            </nav>


            {/* Custom Illustration */}
            <Character />
        </div >
    );
}

export default Dashboard;
