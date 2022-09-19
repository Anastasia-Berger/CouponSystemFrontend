import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/store";
import notify, { ErrMsg } from "../../../Services/Notification";
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
			 {(store.getState().authReducer.user?.token)
                ?
                <>
                    <div className="Container">
                        WELCOME
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
