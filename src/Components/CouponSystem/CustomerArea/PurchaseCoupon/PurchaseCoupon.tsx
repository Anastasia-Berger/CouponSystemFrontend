import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CouponModel } from "../../../../Models/BeansModel/CouponModel";
import { couponAddedAction, couponUpdatedAction } from "../../../../Redux/CouponsAppState";
import { PurchaseCouponAction } from "../../../../Redux/CustomersAppState";
import store from "../../../../Redux/store";
import notify, { ErrMsg, SccMsg } from "../../../../Services/Notification";
import { purchaseCoupon } from "../../../../Web API/CustomerApi";

import "./PurchaseCoupon.css";

function PurchaseCoupon(): JSX.Element {

    const navigate = useNavigate();
    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user.token) {
            console.log(store.getState().authReducer.user);
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    const params = useParams();
    const id = +(params.id || 0);

    // const [coupon] = useState<CouponModel>(store.getState().couponsAppState.coupons.filter(coupon => coupon.id === id)[0]);

    const yes = () => {
        purchaseCoupon(id)
            .then(res => {
                notify.success(SccMsg.PURCHASED);
                // Updating global state
                console.log('PURCHASEEEEED');
                console.log(res.data);
                store.dispatch(couponAddedAction(res.data));
                navigate('/customers/allCoupons');
            })
            .catch(err => {
                notify.error(err);
                console.log(err);
                console.log(err.message);
            });
    }

    const no = () => {
        navigate('/customers/allCoupons');
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


