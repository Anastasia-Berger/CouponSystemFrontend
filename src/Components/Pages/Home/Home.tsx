import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClientType } from "../../../Models/Enums/ClientType";
import store from "../../../Redux/store";
import notify, { ErrMsg } from "../../../Services/Notification";
import CustomLink from "../../Shared/CustomLink/CustomLink";
import EmptyView from "../../Shared/EmptyView/EmptyView";
import "./Home.css";

function Home(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user?.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    return (
        <div className="Home">
            {(store.getState().authReducer.user.clientType == ClientType.ADMINISTRATOR)
                ?
                <>
                    <div className="Container">
                        <div className="home-card">
                            <p><span>
                                <CustomLink to="/admin/companies">Companies</CustomLink>
                            </span></p>
                            <p><span>
                                <CustomLink to="/admin/coupons">Coupons</CustomLink>
                            </span></p>
                            <p><span>
                                <CustomLink to="admin/customers">Customers</CustomLink>
                            </span></p>
                        </div>
                    </div>
                </>
                :
                <>
                    <EmptyView msg="NO COUPONS FOR YOU" />
                </>}

        </div>
    );
}

export default Home;
