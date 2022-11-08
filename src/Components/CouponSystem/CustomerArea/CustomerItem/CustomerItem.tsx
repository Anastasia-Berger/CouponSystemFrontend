import { BsGear } from "react-icons/bs";
import { FiSettings, FiTrash, FiUserX } from "react-icons/fi";
import { CustomerModel } from "../../../../Models/BeansModel/CustomerModel";
import { ClientType } from "../../../../Models/Enums/ClientType";
import store from "../../../../Redux/store";
import CustomLink from "../../../Shared/CustomLink/CustomLink";
import TotalCouponsById from "../../CompanyArea/TotalCouponsById/TotalCouponsById";
import TotalCustomerCouponsById from "../TotalCustomerCouponsById/TotalCustomerCouponsById";
import "./CustomerItem.css";

interface CustomerItemProps {
    customer: CustomerModel;
}

function CustomerItem(props: CustomerItemProps): JSX.Element {

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

                {(store.getState().authReducer.user.clientType == ClientType.CUSTOMER) ?
                    <p>Coupons Purchased:
                    <TotalCustomerCouponsById
                        id={props.customer.id || 0} />
                </p> : <></>}

            </div>
        </div>
    );
}

export default CustomerItem;
