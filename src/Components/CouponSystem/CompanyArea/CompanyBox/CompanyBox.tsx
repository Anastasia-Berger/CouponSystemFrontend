import { useEffect, useState } from "react";
import { BsGear, BsTrash } from "react-icons/bs";
import { FiUserX } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { number } from "yup";
import { CompanyModel } from "../../../../Models/BeansModel/CompanyModel";
import { CouponModel } from "../../../../Models/BeansModel/CouponModel";
import { ClientType } from "../../../../Models/Enums/ClientType";
import store from "../../../../Redux/store";
import notify, { ErrMsg } from "../../../../Services/Notification";
import { countCompanyCoupons, countCustomerCoupons } from "../../../../Web API/AdminApi";
import { getAllCompanyCoupons, getCompanyDetails } from "../../../../Web API/CompanyApi";
import CustomLink from "../../../Shared/CustomLink/CustomLink";
import TotalCouponsById from "../TotalCouponsById/TotalCouponsById";
import TotalCoupons from "../../Totals/TotalCuopons/TotalCoupons";
import "./CompanyBox.css";

interface CompanyBoxProps {
    company: CompanyModel;
}

function CompanyBox(props: CompanyBoxProps): JSX.Element {

    return (

        <div className="CompanyBox">

            <div className="buttons">
                {/* ADMIN EDIT BUTTONS */}
                {(store.getState().authReducer.user?.clientType == ClientType.ADMINISTRATOR)
                    ?
                    <>
                        <CustomLink to={`/admin/companies/delete/${props.company.id}`}>
                            <div className="nav-item">
                                <BsTrash size={20} className='react-icons' />
                            </div>
                        </CustomLink>

                        <CustomLink to={`/admin/companies/edit/${props.company.id}`}>
                            <div className="nav-item">
                                <BsGear size={20} className='react-icons' />
                            </div>
                        </CustomLink>

                    </> : <></>}
            </div>

            <div className="BoxImage">
                <img src={props.company.image} alt={props.company.name} />
            </div>

            <div className="CompanyDetails">
                <p>ID : {props.company.id} </p>
                <p>Name : {props.company.name}</p>
                <div className="CompanyCouponsInBox"><span>Coupons: </span> <TotalCouponsById id={props.company.id || 0} /></div>
            </div>

        </div >
    );
}

export default CompanyBox;
