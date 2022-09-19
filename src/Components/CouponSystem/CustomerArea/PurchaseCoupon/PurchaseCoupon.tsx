import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CouponModel } from "../../../../Models/BeansModel/CouponModel";
import { couponAddedAction } from "../../../../Redux/CouponsAppState";
import store from "../../../../Redux/store";
import notify, { ErrMsg, SccMsg } from "../../../../Services/Notification";
import { purchaseCoupon } from "../../../../Web API/CustomerApi";

import "./PurchaseCoupon.css";

function PurchaseCoupon(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || '');

    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user.token) {
            console.log(store.getState().authReducer.user);
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    const [coupon] = useState<CouponModel>
        (store.getState().couponsAppState.coupons.filter
            (coupon => coupon.id === id)[0]);


    const yes = () => {
        purchaseCoupon(coupon)
            .then(res => {
                notify.success(SccMsg.PURCHASED);
                // Updating global state
                store.dispatch(couponAddedAction(res.data));
                navigate('/customers/coupons');
            })
            .catch(err => notify.error(err));
    }

    const no = () => {
        navigate('/customers/coupons');
    }

    return (
        <div className="PurchaseCoupon">
            <h2>Purchase Coupon</h2>
            <p>Are you sure you want to buy coupon id={id}?</p>
            <div>
                <button onClick={yes}>Yes</button>
                <button onClick={no}>No</button>
            </div>
        </div>
    );
}

export default PurchaseCoupon;


