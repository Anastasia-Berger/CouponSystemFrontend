import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import store from "../../../../../Redux/store";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import "./AddCustomer.css";
import { CustomerModel } from "../../../../../Models/BeansModel/CustomerModel";
import { addCustomer } from "../../../../../Web API/AdminApi";
import { customerAddedAction } from "../../../../../Redux/CustomersAppState";
import { FiKey, FiUser } from "react-icons/fi";
import { BsEnvelope } from "react-icons/bs";

function AddCustomer(): JSX.Element {

    const navigate = useNavigate();
    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user?.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    const schema = yup.object().shape({
        firstName:
            yup.string()
                .required("First name is required"),
        lastName:
            yup.string()
                .required("Last name is required"),
        email:
            yup.string()
                .required("Email is required")
                .email("Invalid email address"),
        password:
            yup.string()
                .min(4, 'Your password is too short.')
                .required("Password is required")
    });


    const { register, handleSubmit, formState: { errors, isDirty, isValid } }
        = useForm<CustomerModel>({ mode: "all", resolver: yupResolver(schema) });

    const sendToRemote = async (customer: CustomerModel) => {
        await addCustomer(customer)
            .then(res => {
                notify.success(SccMsg.ADD_CUSTOMER);
                // Updating global state
                store.dispatch(customerAddedAction(res.data));
                navigate('/admin/customers');

            })
            .catch(err => {
                notify.error(err);
                console.log(err);
                console.log(err.message);
            });
    }

    return (
        <div className="AddCustomer">

            <h2>Add new Customer</h2>
            <form onSubmit={handleSubmit(sendToRemote)}>

            <hr />
                <label htmlFor="firstName" className="icon"><FiUser /></label>
                <input type="text" {...register("firstName")} name="firstName" placeholder="First Name" />
                <span>{errors.firstName?.message}</span>
                <br />

                <label htmlFor="lastName" className="icon"><FiUser /></label>
                <input type="text" {...register("lastName")} name="lastName" placeholder="Last Name" />
                <span>{errors.lastName?.message}</span>
                <br />

                <label htmlFor="email" className="icon"><BsEnvelope /></label>
                <input type="email" {...register("email")} name="email" placeholder="Email" />
                <span>{errors.email?.message}</span>
                <br />

                <label htmlFor="password" className="icon"><FiKey /></label>
                <input type="password" {...register("password")} placeholder="Password" />
                <span>{errors.password?.message}</span>
                <br />

                <button className="button-app" disabled={!isValid}>ADD</button>
            </form>

        </div>
    );
}

export default AddCustomer;
