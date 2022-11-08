import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerModel } from "../../../../Models/BeansModel/CustomerModel";
import { customersDownloadedAction, customerUpdatedAction } from "../../../../Redux/CustomersAppState";
import store from "../../../../Redux/store";
import notify, { ErrMsg } from "../../../../Services/Notification";
import { getAllCustomerCoupons, getCustomerDetails } from "../../../../Web API/CustomerApi";
import EmptyView from "../../../Shared/EmptyView/EmptyView";
import CustomerItem from "../CustomerItem/CustomerItem";
import CustomerCoupons from "../CustomerCoupons/CustomerCoupons";
import "./CustomerDetails.css";

function CustomerDetails(): JSX.Element {

    const navigate = useNavigate();
    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user?.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

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
                <CustomerCoupons />
            </div>


        </div>
    );
}

export default CustomerDetails;
