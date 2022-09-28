import { FiSettings, FiTrash, FiUserX } from "react-icons/fi";
import { BsCartCheck, BsCartPlus, BsCartX, BsGear, BsTrash } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CouponModel } from "../../../../../Models/BeansModel/CouponModel";
import { ClientType } from "../../../../../Models/Enums/ClientType";
import store from "../../../../../Redux/store";
import EndDate from "../../../../Shared/Dates/EndDate/EndDate";
import StartDate from "../../../../Shared/Dates/StartDate/StartDate";
import "./CouponItem.css";
import CustomLink from "../../../../Shared/CustomLink/CustomLink";

interface CouponItemProps {
    coupon: CouponModel;
}

function CouponItem(props: CouponItemProps): JSX.Element {

    return (
        <div className="CouponItem card">

            <div className="buttons">

                {/* ADMIN EDIT BUTTONS */}
                {(store.getState().authReducer.user?.clientType == ClientType.ADMINISTRATOR)
                    ? <>
                        <CustomLink to={`/admin/coupons/delete/${props.coupon.id}`}>
                            <div className="nav-item">
                                <FiUserX size={20} className='react-icons' />
                            </div>
                        </CustomLink>

                        <CustomLink to={`/admin/coupons/edit/${props.coupon.id}`}>
                            <div className="nav-item">
                                <BsGear size={20} className='react-icons' />
                            </div>
                        </CustomLink>
                    </> : <></>}

                {/* COMPANY EDIT BUTTONS */}
                {(store.getState().authReducer.user?.clientType == ClientType.COMPANY)
                    ? <>
                        <div className="buttons">
                            <Link to={`/coupons/delete/${props.coupon.id}`}><button><BsTrash size={20} /></button></Link>
                            <Link to={`/companies/:id/coupons/edit/${props.coupon.id}`}><button><BsGear size={20} /></button></Link>

                            <CustomLink to={`/companies/coupons/delete/${props.coupon.id}`}>
                                <div className="nav-item">
                                    <FiUserX size={20} className='react-icons' />
                                </div>
                            </CustomLink>

                            <CustomLink to={`/companies/coupons/edit/${props.coupon.id}`}>
                                <div className="nav-item">
                                    <BsGear size={20} className='react-icons' />
                                </div>
                            </CustomLink>
                        </div>
                    </> : <></>}

                {/* CUSTOMER PURCHASE BUTTON */}
                {(store.getState().authReducer.user?.clientType == ClientType.CUSTOMER)
                    ? <>
                        <CustomLink to={`/customers/purchase/${props.coupon.id}`}>
                            <div className="nav-item">
                                <BsCartPlus size={20} className='react-icons' />
                            </div>
                        </CustomLink>
                    </> : <></>}
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
