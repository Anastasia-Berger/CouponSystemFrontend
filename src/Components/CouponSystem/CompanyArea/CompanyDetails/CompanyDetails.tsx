import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../../Models/BeansModel/CompanyModel";
import { CouponModel } from "../../../../Models/BeansModel/CouponModel";
import { companyUpdatedAction } from "../../../../Redux/CompaniesAppState";
import { couponsDownloadedAction } from "../../../../Redux/CouponsAppState";
import store from "../../../../Redux/store";
import notify, { ErrMsg } from "../../../../Services/Notification";
import { getAllCompanyCoupons, getCompanyDetails } from "../../../../Web API/CompanyApi";
import CouponItem from "../../CouponArea/CouponItem/CouponItem";
import CompanyBox from "../CompanyBox/CompanyBox";
import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {

    const navigate = useNavigate();
    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user?.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    const [company, setCompany] = useState<CompanyModel>(new CompanyModel());

    useEffect(() => {
        getCompanyDetails()
            .then((res) => {
                // Updating Component State
                setCompany(res.data);
                // Updating global state
                store.dispatch(companyUpdatedAction(res.data));
                // notify.success(SccMsg.GOT_TASKS);
            })
            .catch((err) => { /*notify.error(err);*/ });
    }, []);

    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().couponsAppState.coupons);

    useEffect(() => {
        getAllCompanyCoupons()
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
        <div className="CompanyDetails">
            <h2>Company Profile</h2>


            {(store.getState().authReducer.user?.token)
                ?
                <>
                    <div className="Container">
                        <CompanyBox company={company} />
                        <div className="CompanyCouponsList">
                            {coupons.map((coupon) => <CouponItem key={company.id} coupon={coupon} />)}
                        </div>

                    </div>
                </>
                :
                <>
                    {/* {navigate('/login')} */}
                </>
            }

        </div>
    );
}

export default CompanyDetails;
