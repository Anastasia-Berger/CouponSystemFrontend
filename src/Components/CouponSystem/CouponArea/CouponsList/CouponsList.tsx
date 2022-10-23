import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CouponModel } from "../../../../Models/BeansModel/CouponModel";
import { ClientType } from "../../../../Models/Enums/ClientType";
import { couponsDownloadedAction } from "../../../../Redux/CouponsAppState";
import store from "../../../../Redux/store";
import notify, { ErrMsg } from "../../../../Services/Notification";
import { getAllCoupons } from "../../../../Web API/AdminApi";
import AddButton from "../../../Shared/AddButton/AddButton";
import EmptyView from "../../../Shared/EmptyView/EmptyView";
import CouponItem from "../CouponItem/CouponItem";

function CouponsList(): JSX.Element {

    const navigate = useNavigate();
    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user?.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().couponsAppState.coupons);

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
            <div className="page-title">
                <h2>All Coupons</h2>
                {(store.getState().authReducer.user?.clientType == ClientType.ADMINISTRATOR ?
                    <>
                        <Link to="/admin/coupons/add">
                            <AddButton value={"only by company"} />
                        </Link>
                    </> : <></>)}

                    {(store.getState().authReducer.user?.clientType == ClientType.COMPANY ?
                    <>
                        <Link to="/companies/coupons/add">
                            <AddButton value={"Coupon"} />
                        </Link>
                    </> : <></>)}
            </div>

            {(coupons?.length > 0) ?
                <> <div className="Container">
                    {coupons.map((coupon) => <CouponItem key={coupon.id} coupon={coupon} />)}
                </div> </>
                :
                <> <EmptyView msg="NO COUPONS FOR YOU" /> </>}
        </div>
    );
}

export default CouponsList;
