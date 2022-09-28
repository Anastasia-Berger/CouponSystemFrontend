import { useEffect, useState } from "react";
import { CompanyModel } from "../../../Models/BeansModel/CompanyModel";
import { CustomerModel } from "../../../Models/BeansModel/CustomerModel";
import store from "../../../Redux/store";
import "./UserName.css";

interface UserNameProps {
    customer?: CustomerModel;
    company?: CompanyModel;
}

function UserName(props: UserNameProps): JSX.Element {

    const [customer, setCustomer] = useState(
        store.getState().authReducer.user?.clientType === "CUSTOMER");
    const [company, setCompany] = useState(
        store.getState().authReducer.user?.clientType === "COMPANY");
    const [admin, setAdmin] = useState(
        store.getState().authReducer.user?.clientType === "ADMINISTRATOR");

    useEffect(() => {
        return store.subscribe(() => {
            setCustomer(store.getState().authReducer.user?.clientType === "CUSTOMER");
            setCompany(store.getState().authReducer.user?.clientType === "COMPANY");
            setAdmin(store.getState().authReducer.user?.clientType === "ADMINISTRATOR");
        });
    }, []);

    return (
        <div className="UserName">

            {customer ?
                (<>
                    <span>{" " + props.customer?.firstName + " " + props.customer?.lastName}</span>
                </>)
                :
                (<></>)}

            {company ?
                (<>
                    <span>{" " + props.company?.name + " "}</span>
                </>)
                :
                (<></>)}

            {admin ?
                (<>
                    <span> BOSS</span>
                </>)
                :
                (<></>)}

        </div>
    );
}

export default UserName;
