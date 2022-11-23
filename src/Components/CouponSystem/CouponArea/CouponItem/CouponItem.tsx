import { FiSettings, FiTrash, FiUserX } from "react-icons/fi";
import { BsCartCheck, BsCartPlus, BsCartX, BsGear, BsTrash } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CouponModel } from "../../../../Models/BeansModel/CouponModel";
import { ClientType } from "../../../../Models/Enums/ClientType";
import store from "../../../../Redux/store";
import EndDate from "../../../Shared/Dates/EndDate/EndDate";
import StartDate from "../../../Shared/Dates/StartDate/StartDate";
import "./CouponItem.css";
import CustomLink from "../../../Shared/CustomLink/CustomLink";

interface CouponItemProps {
    coupon: CouponModel;
}

function CouponItem(props: CouponItemProps): JSX.Element {

    return (
        <div className="CouponItem card">

            <div className="buttons">

                {/* COUPON EDIT BUTTONS ONLY FOR COMPANY USE*/}
                {(store.getState().authReducer.user?.clientType == ClientType.COMPANY)
                    ? <>
                        <div className="buttons">
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


            </div>

            <div className="BoxImage">
                <img src={process.env.PUBLIC_URL + '/images/coupons/' + props.coupon.id + '.png'} alt={props.coupon.title} />
                {props.coupon.imageUrl}
            </div>

            <div className="CouponDetails">

                <p>{props.coupon.id} </p>
                URL: {props.coupon.imageUrl}

                <p>Company : {props.coupon.company?.name} </p>
                <p>Title : {props.coupon.title} </p>
                <p>Description : {props.coupon.description} </p>
                <p>Price: {props.coupon.price}</p>
                <p>Available: {props.coupon.amount} un.</p>
                <p>Category : {props.coupon.category} </p>

                <StartDate startDate={props.coupon.startDate || new Date} />
                <EndDate endDate={props.coupon.endDate || new Date} />

            </div>

            <div className="buttons">
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

        </div>
    );
}

export default CouponItem;
