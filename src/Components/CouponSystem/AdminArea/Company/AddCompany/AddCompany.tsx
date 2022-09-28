import "./AddCompany.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CompanyModel } from "../../../../../Models/BeansModel/CompanyModel";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import store from "../../../../../Redux/store";
import { companyAddedAction } from "../../../../../Redux/CompaniesAppState";
import { addCompany } from "../../../../../Web API/AdminApi";
import { FiKey, FiUser } from "react-icons/fi";
import { BsEnvelope } from "react-icons/bs";

function AddCompany(): JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user?.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    const schema = yup.object().shape({
        name:
            yup.string()
                .required("company name is required"),
        email:
            yup.string()
                .required("Email is required")
                .email("Invalid email address"),
        password:
            yup.string()
                .min(4, 'Your password is too short.')
                .required("password is required")
    });


    const { register, handleSubmit, formState: { errors, isDirty, isValid } }
        = useForm<CompanyModel>({ mode: "all", resolver: yupResolver(schema) });

    const sendToRemote = async (company: CompanyModel) => {

        await addCompany(company)
            .then(res => {
                notify.success(SccMsg.ADD_COMPANY);
                // Updating global state
                store.dispatch(companyAddedAction(res.data));
                navigate('/admin/companies');

            })
            .catch(err => {
                notify.error(err);
                console.log(err);
                console.log(err.message);
            });
    }

    return (
        <div className="AddCompany">
            <h2>Add new Company</h2>
            <form onSubmit={handleSubmit(sendToRemote)}>
                <hr />

                <label htmlFor="name" className="icon"><FiUser /></label>
                <input type="text" {...register("name")} name="name" placeholder="Name" />
                <span>{errors.name?.message}</span>
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

export default AddCompany;
