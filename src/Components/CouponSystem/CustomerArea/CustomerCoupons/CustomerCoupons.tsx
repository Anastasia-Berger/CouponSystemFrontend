import { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../../Models/BeansModel/CouponModel";
import { couponsDownloadedAction } from "../../../../Redux/CouponsAppState";
import store from "../../../../Redux/store";
import notify, { ErrMsg, SccMsg } from "../../../../Services/Notification";
import { getAllCustomerCoupons } from "../../../../Web API/CustomerApi";
import CustomLink from "../../../Shared/CustomLink/CustomLink";
import EmptyView from "../../../Shared/EmptyView/EmptyView";
import CouponItem from "../../CouponArea/CouponItem/CouponItem";
import "./CustomerCoupons.css";

function CustomerCoupons(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user?.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().couponsAppState.coupons);

    useEffect(() => {
        getAllCustomerCoupons()
            .then((res) => {
                // Updating Component State
                setCoupons(res.data);
                // Updating global state
                store.dispatch(couponsDownloadedAction(res.data));
                // notify.success(SccMsg.GOT_TASKS);
            })
            .catch((err) => { /*notify.error(err);*/ });
    }, []);

    const [count, setCount] = useState<number>(store.getState().customersAppState.coupons.length);

    useEffect(() => {
        if (count === 0) {
            getAllCustomerCoupons()
                .then(res => setCount(res.data.length))
            // .catch(err => /*notify.error(err)*/);
        }
    }, [count]);//WOW!

    useEffect(() => {
        return store.subscribe(() => {
            setCount(store.getState().customersAppState.coupons.length); // Will let us notify
        });
    }, [])

    return (
        <div className="CustomerCoupons">

            <h2>List of purchased coupons ({count})</h2>

            {(coupons?.length > 0) ?
                <>
                    <div className="Container">
                        {coupons.map((coupon) => <CouponItem key={coupon.id} coupon={coupon} />)}
                    </div>
                </>
                :
                <>
                    <EmptyView msg="NO COUPONS WAS PURCHASED FOR NOW" />
                </>}

        </div>
    );
}

export default CustomerCoupons;
