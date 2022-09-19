import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerModel } from "../../../../Models/BeansModel/CustomerModel";
import { customersDownloadedAction, customerUpdatedAction } from "../../../../Redux/CustomersAppState";
import store from "../../../../Redux/store";
import notify, { ErrMsg } from "../../../../Services/Notification";
import { getCustomerDetails } from "../../../../Web API/CustomerApi";
import EmptyView from "../../../Shared/EmptyView/EmptyView";
import CustomerCoupons from "../CustomerCoupons/CustomerCoupons";
import CustomerItem from "../CustomerItem/CustomerItem";
import "./CustomerDetails.css";

function CustomerDetails(): JSX.Element {

    const navigate = useNavigate();
    const [customerDetails, setCustomerDetails] = useState<CustomerModel>(new CustomerModel());




    useEffect(() => {
        getCustomerDetails()
            .then((res) => {
                // Updating Component State
                setCustomerDetails(res.data);
                // Updating global state
                store.dispatch(customerUpdatedAction(res.data));
                // notify.success(SccMsg.GOT_TASKS);
            })
            .catch((err) => { /*notify.error(err);*/ });
    }, []);


    return (
        <div className="CustomerDetails">


            <div className="Container">
                <CustomerItem customer={customerDetails} />
            </div>


        </div>
    );
}

export default CustomerDetails;
