import { useEffect, useState } from "react";
import { CouponModel } from "../../../../Models/BeansModel/CouponModel";
import notify, { ErrMsg, SccMsg } from "../../../../Services/Notification";
import "./CouponsList.css";
import CustomLink from "../../../Shared/CustomLink/CustomLink";
import { FiPlusCircle } from "react-icons/fi";
import EmptyView from "../../../Shared/EmptyView/EmptyView";
import CouponItem from "../CouponItem/CouponItem";
import { useNavigate } from "react-router-dom";
import store from "../../../../Redux/store";
import { couponsDownloadedAction } from "../../../../Redux/CouponsAppState";
import { getAllCoupons } from "../../../../Web API/CustomerApi";

function CouponsList(): JSX.Element {
    const navigate = useNavigate();

    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().couponsAppState.coupons);

    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user?.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    // Side effects goes here
    useEffect(() => {
        if (coupons?.length === 0) {
            getAllCoupons()
                .then((res) => {
                    // Updating Component State
                    setCoupons(res.data);
                    // Updating global state
                    store.dispatch(couponsDownloadedAction(res.data));
                    // notify.success(SccMsg.GOT_TASKS);
                })
                .catch((err) => { /*notify.error(err);*/ });
        }
    }, []);

    return (
        <div className="CouponsList">
            <h2>List Of Coupons</h2>

            {/* <CustomLink to="/coupons/add"> <FiPlusCircle size={30} /> </CustomLink> */}

            {(coupons?.length > 0)
                ?
                <>
                    <div className="CouponsContainer">
                        {coupons.map((coupon) => <CouponItem key={coupon.id} coupon={coupon} />)}
                    </div>
                </>
                :
                <>
                    <EmptyView msg="NO COUPONS FOR YOU" />
                </>}


        </div>
    );
}

export default CouponsList;
