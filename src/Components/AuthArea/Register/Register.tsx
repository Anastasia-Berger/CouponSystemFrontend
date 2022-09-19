import "./Register.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { RegisterModel } from "../../../Models/Identification/RegisterModel";
import store from "../../../Redux/store";
import { registerAction } from "../../../Redux/AuthAppState";
import notify, { SccMsg } from "../../../Services/Notification";
import { registerRequest } from "../../../Web API/LoginApi";
import { CredentialsModel } from "../../../Models/Identification/CredentialsModel";

function Register(): JSX.Element {

    const navigate = useNavigate();

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
                .required("password is required"),
        confirm:
            yup.string()
                .required("Confirm your password")
                .oneOf([yup.ref('password'), null], 'Passwords must match'),

    });

    const { register, handleSubmit, formState: { errors, isDirty, isValid } }
        = useForm<RegisterModel>({ mode: "all", resolver: yupResolver(schema) });

    const onSubmit = async (registerModel: RegisterModel) => {
        let credentials = new CredentialsModel(

            registerModel.firstName,
            registerModel.lastName,
            registerModel.email,
            registerModel.password
            
            );

        await registerRequest(credentials)
            .then(res => {
                notify.success(SccMsg.REGISTER_SUCCESS);
                // Updating global state
                store.dispatch(registerAction());
                navigate('/login');
            })
            .catch(err => {
                notify.error(err);
                console.log(err);
                console.log();
                console.log(err.message);
            });
    }

    return (
        <div className="Register">
            <h2>Register</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="firstName">first name</label>
                <br />
                <input type="text" {...register("firstName")} name="firstName" placeholder="first name" />
                <br />
                <span>{errors.firstName?.message}</span>
                <br />

                <label htmlFor="lastName">last name</label>
                <br />
                <input type="text" {...register("lastName")} name="lastName" placeholder="last name" />
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

                <label htmlFor="confirm">confirm password</label>
                <br />
                <input type="password" {...register("confirm")} name="confirm" placeholder="confirm" />
                <br />
                <span>{errors.confirm?.message}</span>
                <br />
                
                <button className="button-app" disabled={!isValid}>Register</button>
            </form>
        </div>
    );
}

export default Register;
