import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CouponModel } from "../../../../Models/BeansModel/CouponModel";
import { couponsDownloadedAction } from "../../../../Redux/CouponsAppState";
import store from "../../../../Redux/store";
import notify, { ErrMsg } from "../../../../Services/Notification";
import { getAllCouponsByCategory } from "../../../../Web API/CouponsApi";
import CouponItem from "../CouponItem/CouponItem";
import "./CategoryList.css";

function CategoryList(): JSX.Element {

    const navigate = useNavigate();
    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])
    
    const params = useParams();
    const category = (params.category || '');

    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().couponsAppState.coupons);

    // Side effects goes here
    useEffect(() => {
        getAllCouponsByCategory(category)
            .then((res) => {
                // Updating Component State
                setCoupons(res.data);
                // Updating global state
                store.dispatch(couponsDownloadedAction(res.data));
                // notify.success(SccMsg.GOT_TASKS);
            })
            .catch((err) => { /*notify.error(err);*/ });

    }, []);


    return (
        <div className="CategoryList">

            <h2>{category}</h2>
            <div className="Container">
                {coupons.map(
                    (coupon) => <CouponItem key={coupon.id} coupon={coupon} />)}
            </div>
        </div>
    );
}

export default CategoryList;
