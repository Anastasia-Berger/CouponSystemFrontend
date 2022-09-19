import { useEffect, useState } from "react";
import { FiPlusCircle, FiUserPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../../../Models/BeansModel/CustomerModel";
import { customersDownloadedAction } from "../../../../../Redux/CustomersAppState";
import store from "../../../../../Redux/store";
import notify, { ErrMsg } from "../../../../../Services/Notification";
import { getAllCustomers } from "../../../../../Web API/AdminApi";
import CustomLink from "../../../../Shared/CustomLink/CustomLink";
import EmptyView from "../../../../Shared/EmptyView/EmptyView";
import CustomerItem from "../../../CustomerArea/CustomerItem/CustomerItem";
import "./CustomersList.css";

function CustomersList(): JSX.Element {

    const navigate = useNavigate();

    const [customers, setCustomers] = useState<CustomerModel[]>
        (store.getState().customersAppState.customers);

    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user?.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    // Side effects goes here
    useEffect(() => {
        if (customers?.length === 0) {
            getAllCustomers()
                .then((res) => {
                    // Updating Component State
                    setCustomers(res.data);
                    // Updating global state
                    store.dispatch(customersDownloadedAction(res.data));
                    // notify.success(SccMsg.GOT_TASKS);
                })
                .catch((err) => { /*notify.error(err);*/ });
        }
    }, []);

    
    return (
        <div className="CustomersList">
			
            <h2>Our Customers</h2>
            <Link to="/customers/add"><button><FiUserPlus size={30} /> </button></Link>

            {(customers?.length > 0)
                ?
                <>
                    <div className="CompaniesContainer">
                        {customers.map((customer) => <CustomerItem key={customer.id} customer={customer} />)}
                    </div>

                </>
                :
                <>
                    <EmptyView msg="NO CUSTOMERS FOR YOU" />
                </>}

        </div>
    );
}

export default CustomersList;
