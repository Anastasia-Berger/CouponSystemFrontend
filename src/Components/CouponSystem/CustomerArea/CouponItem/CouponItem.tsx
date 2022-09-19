import { useEffect, useState } from "react";
import { FiSettings, FiTrash } from "react-icons/fi";
import { BsCartCheck, BsCartPlus, BsCartX, BsGear, BsTrash } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CompanyModel } from "../../../../Models/BeansModel/CompanyModel";
import { CouponModel } from "../../../../Models/BeansModel/CouponModel";
import { CustomerModel } from "../../../../Models/BeansModel/CustomerModel";
import { ClientType } from "../../../../Models/Enums/ClientType";
import store from "../../../../Redux/store";
import notify, { ErrMsg } from "../../../../Services/Notification";
import EndDate from "../../../Shared/Dates/EndDate/EndDate";
import StartDate from "../../../Shared/Dates/StartDate/StartDate";
import "./CouponItem.css";

interface CouponItemProps {
    coupon: CouponModel;
}

function CouponItem(props: CouponItemProps): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user?.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    return (
        <div className="CouponItem card">

            <div className="buttons">

                {/* ADMIN EDIT BUTTONS */}
                {(store.getState().authReducer.user?.clientType == ClientType.ADMINISTRATOR)
                    ?
                    <>
                        <div>
                            <Link to={`/coupons/delete/${props.coupon.id}`}><button><BsTrash size={20} /></button></Link>
                            <Link to={`/coupons/edit/${props.coupon.id}`}><button><BsGear size={20} /></button></Link>
                        </div>
                    </>
                    :
                    <>
                    </>}

                {/* COMPANY EDIT BUTTONS */}
                {(store.getState().authReducer.user?.clientType == ClientType.COMPANY)
                    ?
                    <>
                        <div className="buttons">
                            <Link to={`/coupons/delete/${props.coupon.id}`}><button><BsTrash size={20} /></button></Link>
                            <Link to={`/companies/:id/coupons/edit/${props.coupon.id}`}><button><BsGear size={20} /></button></Link>
                        </div>
                    </>
                    :
                    <>
                    </>}

                {/* CUSTOMER EDIT BUTTONS */}
                {(store.getState().authReducer.user?.clientType == ClientType.CUSTOMER)
                    ?
                    <>
                        {/* Check if CUSTOMER owned the coupon for icon purpose: ADD/ADDED */}
                        {(true)
                            ?
                            <>
                                <div>
                                    <Link to={`/customers/purchase/${props.coupon.id}`}><button><BsCartPlus size={22} /></button></Link>
                                </div>
                            </>
                            :
                            <>
                                <div>
                                    <Link to={`/customers/purchase/${props.coupon.id}`}><button><BsCartCheck size={22} /></button></Link>
                                </div>
                            </>
                        }

                    </>
                    :
                    <>
                    </>}

            </div>

            <div className="BoxImage">
                <img src={props.coupon.imageUrl} alt={props.coupon.title} />
            </div>

            <div className="CouponDetails">

                <p>{props.coupon.id} </p>
                <p>Company : {props.coupon.company?.name} </p>
                <p>Title : {props.coupon.title} </p>
                <p>Description : {props.coupon.description} </p>
                <p>Price: {props.coupon.price}</p>
                <p>Available: {props.coupon.amount} un.</p>
                <p>Category : {props.coupon.category} </p>
                
                <StartDate startDate={props.coupon.startDate || new Date} />
                <EndDate endDate={props.coupon.endDate || new Date} />

            </div>

        </div>
    );
}

export default CouponItem;
