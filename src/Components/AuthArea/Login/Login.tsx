import "./Login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import notify, { SccMsg } from "../../../Services/Notification";
import store from "../../../Redux/store";
import { loginAction } from "../../../Redux/AuthAppState";
import { login } from "../../../Web API/LoginApi";
import { ClientType } from "../../../Models/Enums/ClientType";
import { CredentialsModel } from "../../../Models/Identification/CredentialsModel";
import { LoginModel } from "../../../Models/Identification/LoginModel";
import { FiKey, FiUser } from "react-icons/fi";
import { BsEnvelope } from "react-icons/bs";

function Login(): JSX.Element {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email:
            yup.string()
                .required("Email is required")
                .email("Invalid email address"),
        password:
            yup.string()
                .min(4, 'Your password is too short.')
                .required("Password is required"),
        clientType:
            // yup.mixed<ClientType>().oneOf(Object.values(ClientType)),
            yup.string()
                .required("Role type is required")
    });

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<CredentialsModel>({ mode: "all", resolver: yupResolver(schema) });

    const onSubmit = async (credentials: CredentialsModel) => {

        await login(credentials)
            .then(res => {
                notify.success(SccMsg.LOGIN);
                // Updating global state
                store.dispatch(loginAction(res.data));
                // navigate('/home');

                if (credentials.clientType === "COMPANY" && res.data.token !== null) {
                    navigate("/companies/home");
                }

                if (credentials.clientType === "CUSTOMER" && res.data.token !== null) {
                    navigate("/customers/home");
                }

                if (credentials.clientType === "ADMINISTRATOR" && res.data.token !== null) {
                    navigate("/admin/home");
                }

            })
            .catch(err => {
                notify.error(err);
                console.log(err.message);
            });
    }

    return (
        <div className="Login">
            <h2>Login</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <hr />
                <p>Don’t have an account?  <Link to="/register">Sign up</Link></p>

                <hr />
                <label htmlFor="clientType" className="icon"><FiUser /></label>
                <select {...register("clientType")} id="clientType">
                    <option value="" disabled={true} selected style={{ color: "black" }}>Client Role</option>
                    <option value="ADMINISTRATOR">{ClientType.ADMINISTRATOR}</option>
                    <option value="COMPANY">{ClientType.COMPANY}</option>
                    <option value="CUSTOMER">{ClientType.CUSTOMER}</option>
                </select>
                <span>{errors.clientType?.message}</span>

                <br />

                <label htmlFor="email" className="icon"><BsEnvelope /></label>
                <input type="email" {...register("email")} name="email" placeholder="Email" />
                <span>{errors.email?.message}</span>

                <br />

                <label htmlFor="password" className="icon"><FiKey /></label>
                <input type="password" {...register("password")} name="password" placeholder="Password" />
                <span>{errors.password?.message}</span>

                <button className="button-app" disabled={!isValid}>Log In</button>

            </form>
        </div>
    );
}

export default Login;
