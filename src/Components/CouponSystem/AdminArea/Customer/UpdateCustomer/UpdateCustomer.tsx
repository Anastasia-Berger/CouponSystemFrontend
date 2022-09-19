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
    (store.getState().customersAppState.customers.filter(customer => customer.id === id)[0]);

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
        = useForm<CustomerModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const { dirtyFields } = useFormState({
        control
    });

    const sendToRemote = async (customer: CustomerModel) => {

        await updateCustomer(id, customer)
            .then(res => {
                notify.success(SccMsg.UPDATE_CUSTOMER);
                // Updating global state
                store.dispatch(customerUpdatedAction(res.data));
                navigate('/customers');

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

                <label htmlFor="firstName">first name</label>
                <br />
                <input type="text" {...register("firstName")} name="firstName" placeholder="firstName" />
                <br />
                <span>{errors.firstName?.message}</span>
                <br />

                <label htmlFor="lastName">lastName</label>
                <br />
                <input type="text" {...register("lastName")} name="lastName" placeholder="lastName" />
                <br />
                <span>{errors.lastName?.message}</span>
                <br />

                <label htmlFor="email">email</label>
                <br />
                <input type="email" {...register("email")} name="email" placeholder="email" />
                <br />
                <span>{errors.email?.message}</span>
                <br />

                <label htmlFor="password">password</label>
                <br />
                <input type="password" {...register("password")} name="password" placeholder="password" />
                <br />
                <span>{errors.password?.message}</span>
                <br />

                <button className="button-app" disabled={!isValid}>UPDATE</button>
            </form>
        </div>
    );
}

export default UpdateCustomer;
