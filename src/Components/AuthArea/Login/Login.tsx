import "./Login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import notify, { SccMsg } from "../../../Services/Notification";
import store from "../../../Redux/store";
import { loginAction } from "../../../Redux/AuthAppState";
import { login } from "../../../Web API/LoginApi";
import { LoginModel } from "../../../Models/Identification/LoginModel";
import { ClientType } from "../../../Models/Enums/ClientType";
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
                .required("password is required"),
        clientType:
            yup.mixed<ClientType>().oneOf(Object.values(ClientType)),

    });

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<LoginModel>({ mode: "all", resolver: yupResolver(schema) });


    const onSubmit = async (credentials: LoginModel) => {

        await login(credentials)
            .then(res => {
                notify.success(SccMsg.LOGIN_SUCCESS);
                // Updating global state
                store.dispatch(loginAction(res.data));
                navigate('/home');

            })
            .catch(err => {
                notify.error(err);
                console.log(err.message);
            });
    }

    return (
        <div className="Login">
            <h2>Login</h2>
            <p>Don’t have an account?  <Link to="/register">Sign up</Link></p>
            <form onSubmit={handleSubmit(onSubmit)}>
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

                <label htmlFor="clientType">Client Type</label>
                <br />
                <select {...register("clientType")} id="clientType">
                    <option value="" disabled={true} selected style={{ color: "black" }}></option>
                    <option value="ADMIN">{ClientType.ADMINISTRATOR}</option>
                    <option value="COMPANY">{ClientType.COMPANY}</option>
                    <option value="CUSTOMER">{ClientType.CUSTOMER}</option>
                </select>
                <br />
                <span>{errors.clientType?.message}</span>
                
                <button className="button-app" disabled={!isValid}>Log In</button>
            </form>
        </div>
    );
}

export default Login;
