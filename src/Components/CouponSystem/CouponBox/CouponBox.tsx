import { CouponModel } from "../../../Models/CouponModel";
import EndDate from "../../Shared/Dates/EndDate/EndDate";
import StartDate from "../../Shared/Dates/StartDate/StartDate";
import "./CouponBox.css";

interface CouponBoxProps {
    coupon: CouponModel;
}
function CouponBox(props: CouponBoxProps): JSX.Element {


    return (
        <div className="CouponBox">

            <div className="BoxImage">
                <img src={props.coupon.imageUrl} alt="yoda" />
            </div>

            <div className="CouponDetails">
                <p>{props.coupon.id} </p>
                <p>Company : {props.coupon.companyID} </p>
                <p>Title : {props.coupon.title} </p>
                <p>Price: {props.coupon.price}</p>
                <p>Amount: {props.coupon.amount}</p>
                <p>Description : {props.coupon.description} </p>
                <p>Category : {props.coupon.category} </p>
                <StartDate startDate={props.coupon.startDate || new Date}/>
                <EndDate endDate={props.coupon.endDate || new Date}/>

            </div>

        </div>
    );
}

export default CouponBox;
