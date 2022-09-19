import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../../Redux/store";
import notify, { ErrMsg } from "../../../../Services/Notification";
import { countCoupons } from "../../../../Web API/AdminApi";
import { getAllCompanyCoupons } from "../../../../Web API/CompanyApi";
import { getAllCustomerCoupons } from "../../../../Web API/CustomerApi";
import "./TotalCoupons.css";

function TotalCoupons(): JSX.Element {

    const navigate = useNavigate();
    const [count, setCount] = useState<number>(store.getState().couponsAppState.coupons.length);

    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user?.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    useEffect(() => {

        if (store.getState().authReducer.user?.clientType === "ADMINISTRATOR") {
            countCoupons()
                .then(res => setCount(res.data))
                .catch(err => notify.error(err));
        }

        if (store.getState().authReducer.user?.clientType === "COMPANY") {
            getAllCompanyCoupons()
                .then(res => setCount(res.data.length))
                .catch(err => notify.error(err));
        }

        if (store.getState().authReducer.user?.clientType === "CUSTOMER") {
            getAllCustomerCoupons()
                .then(res => setCount(res.data.length))
                .catch(err => notify.error(err));
        }
        
    }, []);



    useEffect(() => {
        return store.subscribe(() => {
            setCount(store.getState().couponsAppState.coupons.length); // Will let us notify
        })
    }, []);

    return (
        <div className="TotalCoupons">
            <span className={count > 0 ? "full_count" : "empty_count"}> {count} </span>
        </div>
    );
}

export default TotalCoupons;
