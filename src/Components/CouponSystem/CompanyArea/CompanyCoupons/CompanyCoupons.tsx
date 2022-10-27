import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CouponModel } from "../../../../Models/BeansModel/CouponModel";
import { couponsDownloadedAction } from "../../../../Redux/CouponsAppState";
import store from "../../../../Redux/store";
import notify, { ErrMsg } from "../../../../Services/Notification";
import { getAllCompanyCoupons } from "../../../../Web API/CompanyApi";
import AddButton from "../../../Shared/AddButton/AddButton";
import EmptyView from "../../../Shared/EmptyView/EmptyView";
import CouponItem from "../../CouponArea/CouponItem/CouponItem";
import "./CompanyCoupons.css";

function CompanyCoupons(): JSX.Element {
    const navigate = useNavigate();

    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().couponsAppState.coupons);

    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user?.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])


    useEffect(() => {
        if (coupons?.length === 0) {
            getAllCompanyCoupons()
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
        <div className="CompanyCoupons">
			<div className="page-title">
                        <h2>Company Coupons</h2>
                        <Link to="/companies/coupons/add">
                            <AddButton value={"Coupon"} />
                        </Link>
                    </div>
                    {(coupons?.length > 0) ?
                        <>
                            <div className="Container">
                                {coupons.map((coupon) => <CouponItem key={coupon.id} coupon={coupon} />)}
                            </div>
                        </>
                        :
                        <> <EmptyView msg="NO COUPONS FOR YOU" /> </>}

        </div>
    );
}

export default CompanyCoupons;
