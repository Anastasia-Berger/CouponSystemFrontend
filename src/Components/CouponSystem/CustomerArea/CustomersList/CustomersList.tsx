import { useEffect, useState } from "react";
import { BsPersonPlus } from "react-icons/bs";
import { FiPlusCircle, FiUserPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../../Models/BeansModel/CustomerModel";
import { ClientType } from "../../../../Models/Enums/ClientType";
import { customersDownloadedAction } from "../../../../Redux/CustomersAppState";
import store from "../../../../Redux/store";
import notify, { ErrMsg } from "../../../../Services/Notification";
import { getAllCustomers } from "../../../../Web API/AdminApi";
import AddButton from "../../../Shared/AddButton/AddButton";
import CustomLink from "../../../Shared/CustomLink/CustomLink";
import EmptyView from "../../../Shared/EmptyView/EmptyView";
import CustomerItem from "../CustomerItem/CustomerItem";
import "./CustomersList.css";

function CustomersList(): JSX.Element {

    const navigate = useNavigate();
    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user?.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    const [customers, setCustomers] = useState<CustomerModel[]>
        (store.getState().customersAppState.customers);

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

            <div className="page-title">
                <h2>Our Customers</h2>
                {(store.getState().authReducer.user.clientType == ClientType.ADMINISTRATOR) ?
                    <>
                        <Link to="/admin/customers/add">
                            {/* <FiUserPlus size={28} /> */}
                            <AddButton value={"Customer"} />
                        </Link>
                    </> : <></>}
            </div>

            {(customers?.length > 0) ?
                <div className="Container">
                    {customers.map((customer) => <CustomerItem key={customer.id} customer={customer} />)}
                </div>
                :
                <> <EmptyView msg="NO CUSTOMERS FOR YOU" /> </>}

        </div>
    );
}

export default CustomersList;
