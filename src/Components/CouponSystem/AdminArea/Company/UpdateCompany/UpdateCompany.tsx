import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompanyModel } from "../../../../../Models/BeansModel/CompanyModel";
import store from "../../../../../Redux/store";
import "./UpdateCompany.css";
import { updateCompany } from "../../../../../Web API/AdminApi";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import { companyUpdatedAction } from "../../../../../Redux/CompaniesAppState";

function UpdateCompany(): JSX.Element {
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

    const [company, setCompany] = useState<CompanyModel>
    (store.getState().companiesAppState.companies.filter(company => company.id === id)[0]);

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

    let defaultValuesObj = { ...company };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<CompanyModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const { dirtyFields } = useFormState({
        control
    });

    const sendToRemote = async (company: CompanyModel) => {

        await updateCompany(id, company)
            .then(res => {
                notify.success(SccMsg.UPDATE_COMPANY);
                // Updating global state
                store.dispatch(companyUpdatedAction(res.data));
                navigate('/companies');

            })
            .catch(err => {
                notify.error(err);
                console.log(err);
                console.log(err.message);
            });
    }


    return (
        <div className="UpdateCompany">
            <h2>Update company details: </h2>
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

                <button className="button-app" disabled={!isValid}>UPDATE</button>
            </form>
        </div>
    );
}

export default UpdateCompany;
