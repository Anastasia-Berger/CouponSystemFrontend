import { useEffect } from "react";
import { FiSettings, FiTrash } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../../Models/BeansModel/CustomerModel";
import { ClientType } from "../../../../Models/Enums/ClientType";
import store from "../../../../Redux/store";
import notify, { ErrMsg } from "../../../../Services/Notification";
import CustomerCoupons from "../CustomerCoupons/CustomerCoupons";
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

    return (
        <div className="CustomerItem">

            <div className="buttons">
                {/* ADMIN EDIT BUTTONS */}
                {(store.getState().authReducer.user?.clientType == ClientType.ADMINISTRATOR)
                    ?
                    <>
                        <Link to={`/customer/delete/${props.customer.id}`}><button><FiTrash size={20} /></button></Link>
                        <Link to={`/customer/edit/${props.customer.id}`}><button><FiSettings size={20} /></button></Link>
                    </>
                    :
                    <>
                    </>}
            </div>

            <div className="BoxImage">
                <img src={props.customer.imageUrl} alt="yoda" />
            </div>

            <div className="Details">
                <p>First Name: {props.customer.firstName}</p>
                <p>Last Name: {props.customer.lastName}</p>
                <p>Email: {props.customer.email}</p>
                <p>Coupons Purchased: {props.customer.coupons?.length}</p>
            </div>
        </div>
    );
}

export default CustomerItem;
