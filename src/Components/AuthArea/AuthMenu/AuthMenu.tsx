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
import UserName from "../UserName/UserName";
import CustomLink from "../../Shared/CustomLink/CustomLink";
import Avatar from "../Avatar/Avatar";
import { FiLogIn, FiLogOut } from "react-icons/fi";


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
                    <CustomLink to='/logout'>
                        <div className="nav-item">
                            <FiLogOut size={20} className='react-icons' />
                        </div>
                    </CustomLink>

                    <Avatar uuid={store.getState().authReducer.user?.token} />


                    {/* Display name by user type */}
                    <div className='name-area'>Hello <UserName />!</div>

                    <br />

                </>
                :
                <>
                    {/* <CustomLink to='/login'>
                        <div className="nav-item">
                            <FiLogIn size={20} className='react-icons' />
                        </div>
                    </CustomLink> */}
                    <Avatar uuid={store.getState().authReducer.user?.token} />

                    <span>Hello Sunshine!</span>
                    <br />
                    {/* <div>
                        <Link to='/register'>Register </Link>
                        /
                        <Link to='/login'> Login</Link>
                    </div> */}
                </>
            }
        </div>
    );
}

export default AuthMenu;