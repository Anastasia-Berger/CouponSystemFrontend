import { useEffect, useState } from "react";
import { CouponModel } from "../../../../../Models/BeansModel/CouponModel";
import { getCoupons } from "../../../../../Web API/CouponsApi";
import notify, { SccMsg } from "../../../../../Services/Notification";
import "./CouponsList.css";
import CustomLink from "../../../../Shared/CustomLink/CustomLink";
import { FiPlusCircle } from "react-icons/fi";
import EmptyView from "../../../../Shared/EmptyView/EmptyView";
import CouponItem from "../CouponItem/CouponItem";

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

            <CustomLink to="/coupons/add"> <FiPlusCircle size={30} /> </CustomLink>
            
            {(coupons?.length > 0)
                ?
                <>
                    <div className="CouponsContainer">{coupons.map((coupon) => <CouponItem key={coupon.id} coupon={coupon} />)}</div>

                </>
                :
                <>
                    <EmptyView msg="NO COUPONS FOR YOU" />
                </>}


        </div>
    );
}

export default CouponsList;
