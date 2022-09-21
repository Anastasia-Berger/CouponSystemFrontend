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
import { FiKey, FiUser } from "react-icons/fi";
import { BsEnvelope } from "react-icons/bs";

function Register(): JSX.Element {

    const navigate = useNavigate();

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
                .required("Password is required")
                .min(4, 'Your password is too short'),

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
                <hr />
                <label htmlFor="clientType" className="icon"><FiUser /></label>
                <input type="text" {...register("firstName")} name="firstName" placeholder="First Name" />
                <span>{errors.firstName?.message}</span>
                <br />

                <label htmlFor="clientType" className="icon"><FiUser /></label>
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

                <label htmlFor="confirm" className="icon"><FiKey /></label>
                <input type="password" {...register("confirm")} name="confirm" placeholder="Confirm" />
                <span>{errors.confirm?.message}</span>

                <button className="button-app" disabled={!isValid}>Register</button>
            </form>
        </div>
    );
}

export default Register;
