import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomerModel } from "../../../../../Models/BeansModel/CustomerModel";
import store from "../../../../../Redux/store";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import "./UpdateCustomer.css";
import { updateCustomer } from "../../../../../Web API/AdminApi";
import { customerUpdatedAction } from "../../../../../Redux/CustomersAppState";
import { FiKey, FiUser } from "react-icons/fi";
import { BsEnvelope } from "react-icons/bs";

function UpdateCustomer(): JSX.Element {

    const navigate = useNavigate();
    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    },[])

    const params = useParams();
    const id = +(params.id || '');

    const [customer, setCustomer] = useState<CustomerModel>
    (store.getState().customersAppState.customers.filter(
        customer => customer.id === id)[0]);

    const schema = yup.object().shape({
        firstName:
            yup.string()
                .required("first name is required"),
        lastName:
            yup.string()
                .required("last name is required"),
        email:
            yup.string()
                .required("Email is required")
                .email("Invalid email address"),
        password:
            yup.string()
                .min(4, 'Your password is too short.')
                .required("password is required")
    });

    let defaultValuesObj = { ...customer };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<CustomerModel>(
            { 
                defaultValues: defaultValuesObj, 
                mode: "all", 
                resolver: yupResolver(schema) 
            });

    const { dirtyFields } = useFormState({control});

    const sendToRemote = async (customer: CustomerModel) => {
        await updateCustomer(id, customer)
            .then(res => {
                notify.success(SccMsg.UPDATE_CUSTOMER);
                // Updating global state
                store.dispatch(customerUpdatedAction(res.data));
                navigate('/admin/customers');
            })
            .catch(err => {
                notify.error(err);
                console.log(err);
                console.log(err.message);
            });
    }
    
    return (
        <div className="UpdateCustomer">
			<h2>Update Customer</h2>
            <form onSubmit={handleSubmit(sendToRemote)}>

            <hr />
                <label htmlFor="firstName" className="icon"><FiUser /></label>
                <input 
                    type="text" {...register("firstName")} 
                    name="firstName" 
                    placeholder="First Name" />
                <span>{errors.firstName?.message}</span>
                <br />

                <label htmlFor="lastName" className="icon"><FiUser /></label>
                <input 
                    type="text" {...register("lastName")} 
                    name="lastName" 
                    placeholder="Last Name" />
                <span>{errors.lastName?.message}</span>
                <br />

                <label htmlFor="email" className="icon"><BsEnvelope /></label>
                <input 
                    type="email" {...register("email")} 
                    name="email" 
                    placeholder="Email" />
                <span>{errors.email?.message}</span>
                <br />

                <label htmlFor="password" className="icon"><FiKey /></label>
                <input 
                    type="password" {...register("password")} 
                    name="password" 
                    placeholder="Password" />
                <span>{errors.password?.message}</span>
                <br />

                <button disabled={!isDirty} className="button-app" >UPDATE</button>
            </form>
        </div>
    );
}

export default UpdateCustomer;
