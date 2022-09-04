import "./Register.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { RegisterModel } from "../../../Models/Identification/RegisterModel";
import store from "../../../Redux/store";
import { registerAction } from "../../../Redux/AuthAppState";
import notify, { SccMsg } from "../../../Services/Notification";
import { LoginModel } from "../../../Models/Identification/LoginModel";
import { registerRequest } from "../../../Web API/LoginApi";
import globals from "../../../Services/Globals";
import axios from "axios";
import { useHistory } from "react-router-dom";


function Register(): JSX.Element {
    const history = useHistory(); //Redirect function
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } 
    = 
    useForm<RegisterModel>({ mode: "onTouched" });
    // console.log(errors);


    async function send(user: RegisterModel) {
        console.log(user);
        try {
            const response = await axios.post<RegisterModel>(globals.urls.login + "register", user);
            store.dispatch(registerAction(response.data));
            console.log(response.data);
            notify.success(SccMsg.REGISTER_SUCCESS);
            history.push("/home"); // Redirect to home in success
        }
        catch (err) {
            notify.error(err);
        }
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
