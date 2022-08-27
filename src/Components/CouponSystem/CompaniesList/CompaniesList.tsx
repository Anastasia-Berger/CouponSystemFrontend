import { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { CompanyModel } from "../../../Models/CompanyModel";
import notify, { SccMsg } from "../../../Services/Notification";
import { getCompanies } from "../../../Web API/CompanyApi";
import CustomLink from "../../Shared/CustomLink/CustomLink";
import CompanyBox from "../CompanyBox/CompanyBox";
import "./CompaniesList.css";

function CompaniesList(): JSX.Element {

    const [companies, setCompanies] = useState<CompanyModel[]>([]);

    useEffect(() => {
        getCompanies()
            .then((res) => {
                console.log(res.data);
                setCompanies(res.data)
                notify.success(SccMsg.ADDED_TASK);
            })
            .catch((err) => { notify.error(err); });
        ;
    }, []);

    return (
        <div className="CompaniesList">
            <h2>Our Companies</h2>
            <CustomLink to="/companies/add"> <FiPlusCircle size={30}/> </CustomLink>
            <div className="CompaniesContainer">{companies.map((company) => <CompanyBox key={company.id} company={company} />)}</div>


        </div>
    );
}

export default CompaniesList;
