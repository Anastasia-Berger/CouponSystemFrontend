import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/store";
import globals from "../../../Services/Globals";
import notify, { ErrMsg } from "../../../Services/Notification";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Avatar from "../../AuthArea/Avatar/Avatar";
import "./DashboardHeader.css";

function DashboardHeader(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user?.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])


    return (
        <div className="DashboardHeader">
            {/* User */}
            <Avatar uuid={1} />

            {/* Custom Menu */}
            <AuthMenu />



        </div>
    );
}

export default DashboardHeader;
