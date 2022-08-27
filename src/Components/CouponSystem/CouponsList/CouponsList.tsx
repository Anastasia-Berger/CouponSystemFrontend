import { useEffect, useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import { getCoupons } from "../../../Web API/CouponsApi";
import notify, { SccMsg } from "../../../Services/Notification";
import CouponBox from "../CouponBox/CouponBox";
import "./CouponsList.css";

function CouponsList(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    
    useEffect(() => {
        getCoupons()
            .then((res) => {
                console.log(res.data);
                setCoupons(res.data)
                notify.success(SccMsg.ADDED_TASK);
            })
            .catch((err) => { notify.error(err); });
        ;
    }, []);


    return (
        <div className="CouponsList">
			<h2>List Of Coupons</h2>

            <div className="CouponsContainer">{coupons.map((coupon) => <CouponBox key={coupon.id} coupon={coupon} />)}</div>

        </div>
    );
}

export default CouponsList;
