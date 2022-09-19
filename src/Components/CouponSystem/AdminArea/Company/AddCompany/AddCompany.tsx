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
                navigate('/companies');

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

                <label htmlFor="name">name</label>
                <br />
                <input type="text" {...register("name")} name="name" placeholder="name" />
                <br />
                <span>{errors.name?.message}</span>
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
                
                <button className="button-app" disabled={!isValid}>Create Task</button>
            </form>
        </div>
    );
}

export default AddCompany;
