import { useEffect, useState } from "react";
import store from "../../../../Redux/store";
import notify from "../../../../Services/Notification";
import { countCustomerCoupons } from "../../../../Web API/AdminApi";
import { getAllCustomerCoupons } from "../../../../Web API/CustomerApi";
import "./TotalCustomerCouponsById.css";

interface TotalCustomerCouponsById {
    id: number;
}
function TotalCustomerCouponsById(props: TotalCustomerCouponsById): JSX.Element {

    const [count, setCount] = useState<number>(store.getState().couponsAppState.coupons.length);

    useEffect(() => {

        if (store.getState().authReducer.user?.clientType === "ADMINISTRATOR") {
            countCustomerCoupons(props.id)
                .then(res => setCount(res.data))
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
        <div className="TotalCustomerCouponsById">
            <span className={count > 0 ? "full_count" : "empty_count"}> {count} </span>
        </div>
    );
}

export default TotalCustomerCouponsById;
