import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CompanyModel } from "../../../Models/BeansModel/CompanyModel";
import { CustomerModel } from "../../../Models/BeansModel/CustomerModel";
import { ClientType } from "../../../Models/Enums/ClientType";
import { companyUpdatedAction } from "../../../Redux/CompaniesAppState";
import { customerUpdatedAction } from "../../../Redux/CustomersAppState";
import store from "../../../Redux/store";
import { getCompanyDetails } from "../../../Web API/CompanyApi";
import { getCustomerDetails } from "../../../Web API/CustomerApi";
import "./UserName.css";


function UserName(): JSX.Element {

    const params = useParams();
    const id = +(params.id || '');

    const [company, setCompany] = useState<CompanyModel>
        (store.getState().companiesAppState.companies.filter(
            company => company.id === id)[0]);

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

    
    const [customer, setCustomer] = useState<CustomerModel>
        (store.getState().customersAppState.customers.filter(
            customer => customer.id === id)[0]);

        useEffect(() => {
            getCustomerDetails()
                .then((res) => {
                    // Updating Component State
                    setCustomer(res.data);
                    // Updating global state
                    store.dispatch(customerUpdatedAction(res.data));
                    // notify.success(SccMsg.GOT_TASKS);
                })
                .catch((err) => { /*notify.error(err);*/ });
        }, []);


    const [admin, setAdmin] = useState(
        store.getState().authReducer.user?.clientType === "ADMINISTRATOR");



    useEffect(() => {
        return store.subscribe(() => {
            // setCustomer(store.getState().authReducer.user?.clientType === "CUSTOMER");
            // setCompany(store.getState().authReducer.user?.clientType === "COMPANY");
            setAdmin(store.getState().authReducer.user?.clientType === "ADMINISTRATOR");
        });
    }, []);


    return (
        <div className="UserName">

            {store.getState().authReducer.user?.clientType == ClientType.CUSTOMER ?
                (<>
                    <span>{" " + customer?.firstName + " " + customer?.lastName}</span>
                </>)
                :
                (<></>)}

            {store.getState().authReducer.user?.clientType == ClientType.COMPANY ?
                (<>
                    <span>{" " + company?.name + " "}</span>
                </>)
                :
                (<></>)}

            {store.getState().authReducer.user?.clientType == ClientType.ADMINISTRATOR ?
                (<>
                    <span> BOSS</span>
                </>)
                :
                (<></>)}

        </div>
    );
}

export default UserName;