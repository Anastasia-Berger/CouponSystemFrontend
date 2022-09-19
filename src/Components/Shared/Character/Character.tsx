import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import store from "../../../Redux/store";
import notify, { ErrMsg } from "../../../Services/Notification";
import "./Character.css";

function Character(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user?.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    const userType = store.getState().authReducer.user?.clientType;

    return (
        <div className="Character">

<Routes>
    {/* <Route path="/login" component=""/> */}
</Routes>

            { userType ? (
                <>
                    <img src={require('./../../../Assets/Users/' + userType + '.png')} />
                </>
            ) : (
                <><img src={require('./../../../Assets/Users/UnAuthorized.png')} /></>
            )}

        </div>


    );
}

export default Character;
