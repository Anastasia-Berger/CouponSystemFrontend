import { useEffect, useState } from "react";
import { BsGear } from "react-icons/bs";
import { FiSettings, FiTrash, FiUserX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../../../Models/BeansModel/CustomerModel";
import { ClientType } from "../../../../../Models/Enums/ClientType";
import store from "../../../../../Redux/store";
import notify, { ErrMsg } from "../../../../../Services/Notification";
import { getAllCustomerCoupons } from "../../../../../Web API/CustomerApi";
import CustomLink from "../../../../Shared/CustomLink/CustomLink";
import CustomerCoupons from "../../../CustomerArea/CustomerCoupons/CustomerCoupons";
import "./CustomerItem.css";

interface CustomerItemProps {
    customer: CustomerModel;
}

function CustomerItem(props: CustomerItemProps): JSX.Element {

    const navigate = useNavigate();
    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user?.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    const [count, setCount] =
        useState<number>(store.getState().customersAppState.coupons.length);

    useEffect(() => {
        getAllCustomerCoupons()
            .then(res => setCount(res.data.length))
            .catch(err => notify.error(err));
    }, []);

    useEffect(() => {
        return store.subscribe(() => {
            setCount(store.getState().customersAppState.coupons.length); // Will let us notify
        })
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
                <p>First Name: {props.customer.firstName}</p>
                <p>Last Name: {props.customer.lastName}</p>
                <p>Email: {props.customer.email}</p>
                <p>Coupons Purchased:
                    <span className={count > 0 ? "full_count" : "empty_count"}> {count} </span>
                </p>
            </div>
        </div>
    );
}

export default CustomerItem;
