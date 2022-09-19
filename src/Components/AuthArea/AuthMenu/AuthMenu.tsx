import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../Models/BeansModel/CustomerModel";
import { ClientType } from "../../../Models/Enums/ClientType";
import { UserModel } from "../../../Models/Identification/UserModel";
import store from "../../../Redux/store";
import { BsBoxArrowRight } from "react-icons/bs";
import "./AuthMenu.css";
import { IconBase } from "react-icons/lib";
import { CompanyModel } from "../../../Models/BeansModel/CompanyModel";


function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>(store.getState().authReducer.user);

    useEffect(() => {

        const unsubscribe = store.subscribe(() => {
            setUser(store.getState().authReducer?.user || new UserModel());
        });

        return unsubscribe;
    }, []);


    return (
        <div className="AuthMenu">

            {user?.token ?   // Checks if user is authenticated
                <>
                    <Link to='/logout'>
                        <BsBoxArrowRight size={20} />
                    </Link>

                    {/* Display name by user type */}
                    <span>Hello </span>

                    <br />



                </>
                :
                <>
                    <span>Hello Sunshine</span>
                    <br />
                    <Link to='/register'>Register</Link>
                    &nbsp;

                    <Link to='/login'>Login</Link>
                </>
            }
        </div>
    );
}

export default AuthMenu;