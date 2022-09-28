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
import CouponItem from "../../CompanyArea/Coupons/CouponItem/CouponItem";
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

    const [coupons, setCoupons] = useState<CouponModel[]>
    (store.getState().couponsAppState.coupons);

        // Side effects goes here
        useEffect(() => {
            if (coupons?.length === 0) {
                getAllCustomerCoupons()
                    .then((res) => {
                        // Updating Component State
                        setCoupons(res.data);
                        // Updating global state
                        store.dispatch(couponsDownloadedAction(res.data));
                        notify.success(SccMsg.ALL_COUPONS);
                    })
                    .catch((err) => { notify.error(err); });
            }
        }, []);
    
    return (
        <div className="CustomerCoupons">
			
            <h2>List Of Coupons</h2>

            <CustomLink to="/coupons/add"> <FiPlusCircle size={30} /> </CustomLink>

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

export default CustomerCoupons;
