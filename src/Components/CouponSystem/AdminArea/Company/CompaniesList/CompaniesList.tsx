import { useEffect, useState } from "react";
import { FiPlusCircle, FiUserPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../../../Models/BeansModel/CompanyModel";
import { companiesDownloadedAction } from "../../../../../Redux/CompaniesAppState";
import store from "../../../../../Redux/store";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import { getAllCompanies } from "../../../../../Web API/AdminApi";
import CustomLink from "../../../../Shared/CustomLink/CustomLink";
import EmptyView from "../../../../Shared/EmptyView/EmptyView";
import CompanyBox from "../CompanyBox/CompanyBox";
import "./CompaniesList.css";

function CompaniesList(): JSX.Element {
    const navigate = useNavigate();

    const [companies, setCompanies] = useState<CompanyModel[]>
        (store.getState().companiesAppState.companies);

    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user?.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    // Side effects goes here
    useEffect(() => {
        if (companies?.length === 0) {
            getAllCompanies()
                .then((res) => {
                    // Updating Component State
                    setCompanies(res.data);
                    // Updating global state
                    store.dispatch(companiesDownloadedAction(res.data));
                    // notify.success(SccMsg.GOT_TASKS);
                })
                .catch((err) => { /*notify.error(err);*/ });
        }
    }, []);

    return (
        <div className="CompaniesList">
            <h2>Our Companies</h2>
            <Link to="/companies/add"><button><FiUserPlus size={30} /> </button></Link>

            {(companies?.length > 0)
                ?
                <>
                    <div className="CompaniesContainer">
                        {companies.map((company) => <CompanyBox key={company.id} company={company} />)}
                    </div>

                </>
                :
                <>
                    <EmptyView msg="NO COMPANIES FOR YOU" />
                </>}


        </div>
    );
}

export default CompaniesList;
