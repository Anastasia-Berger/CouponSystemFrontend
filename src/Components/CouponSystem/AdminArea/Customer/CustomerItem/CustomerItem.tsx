import { useEffect, useState } from "react";
import { BsGear } from "react-icons/bs";
import { FiSettings, FiTrash, FiUserX } from "react-icons/fi";
import { CustomerModel } from "../../../../../Models/BeansModel/CustomerModel";
import { ClientType } from "../../../../../Models/Enums/ClientType";
import { customersDownloadedAction } from "../../../../../Redux/CustomersAppState";
import store from "../../../../../Redux/store";
import { getAllCustomerCoupons } from "../../../../../Web API/CustomerApi";
import CustomLink from "../../../../Shared/CustomLink/CustomLink";
import CouponItem from "../../../CompanyArea/Coupons/CouponItem/CouponItem";
import "./CustomerItem.css";

interface CustomerItemProps {
    customer: CustomerModel;
}

function CustomerItem(props: CustomerItemProps): JSX.Element {

    const [customerCoupons, setCustomerCoupons] = useState<CustomerModel[]>
    (store.getState().customersAppState.coupons);

// Side effects goes here
useEffect(() => {
    if (customerCoupons?.length === 0) {
        getAllCustomerCoupons()
            .then((res) => {
                // Updating Component State
                setCustomerCoupons(res.data);
                // Updating global state
                store.dispatch(customersDownloadedAction(res.data));
                // notify.success(SccMsg.GOT_TASKS);
            })
            .catch((err) => { /*notify.error(err);*/ });
    }
}, []);

    return (
        <div className="CustomerItem">

            <div className="buttons">
                {/* ADMIN EDIT BUTTONS */}
                {(store.getState().authReducer.user?.clientType == ClientType.ADMINISTRATOR)
                    ?
                    <>
                        <CustomLink to={`/admin/customers/delete/${props.customer.id}`}>
                            <div className="nav-item">
                                <FiUserX size={20} className='react-icons' />
                            </div>
                        </CustomLink>

                        <CustomLink to={`/admin/customers/edit/${props.customer.id}`}>
                            <div className="nav-item">
                                <BsGear size={20} className='react-icons' />
                            </div>
                        </CustomLink>

                    </> : <></>}
            </div>

            <div className="BoxImage">
                <img src={props.customer.imageUrl} alt={props.customer.firstName} />
            </div>

            <div className="Details">
                <p>Full Name: {props.customer.firstName} {props.customer.lastName}</p>
                <p>Email: {props.customer.email}</p>
                <p>Password: {props.customer.password}</p>
                <p>Coupons Purchased: {customerCoupons?.length}
                    </p>
                {/* <span className={count > 0 ? "full_count" : "empty_count"}> {count} </span> */}
            </div>
        </div>
    );
}

export default CustomerItem;
