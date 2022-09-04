import { CompanyModel } from "../../../../../Models/BeansModel/CompanyModel";
import { CouponModel } from "../../../../../Models/BeansModel/CouponModel";
import EndDate from "../../../../Shared/Dates/EndDate/EndDate";
import StartDate from "../../../../Shared/Dates/StartDate/StartDate";
import "./CouponItem.css";

interface CouponItemProps {
    coupon: CouponModel;
}

function CouponItem(props: CouponItemProps): JSX.Element {

    return (
        <div className="CouponItem">

            <div className="BoxImage">
                <img src={props.coupon.imageUrl} alt="yoda" />
            </div>

            <div className="CouponDetails">
                <p>{props.coupon.id} </p>
                <p>Company : {props.coupon.company?.name} </p>
                <p>Title : {props.coupon.title} </p>
                <p>Price: {props.coupon.price}</p>
                <p>Amount: {props.coupon.amount}</p>
                <p>Description : {props.coupon.description} </p>
                <p>Category : {props.coupon.category} </p>
                <StartDate startDate={props.coupon.startDate || new Date} />
                <EndDate endDate={props.coupon.endDate || new Date} />

            </div>

        </div>
    );
}

export default CouponItem;
