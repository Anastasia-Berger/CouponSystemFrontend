import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../../../Models/BeansModel/CompanyModel";
import { companyUpdatedAction } from "../../../../../Redux/CompaniesAppState";
import store from "../../../../../Redux/store";
import notify, { ErrMsg } from "../../../../../Services/Notification";
import { getCompanyDetails } from "../../../../../Web API/CompanyApi";
import CompanyBox from "../../../AdminArea/Company/CompanyBox/CompanyBox";
import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {

    const navigate = useNavigate();
    const [company, setCompany] = useState<CompanyModel>(new CompanyModel());

    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user?.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

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


    return (
        <div className="CompanyDetails">
            <h2>Company Profile</h2>


            {(store.getState().authReducer.user?.token)
                ?
                <>
                    <div className="Container">
                        <CompanyBox company={company} />
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
