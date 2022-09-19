import { useEffect, useState } from "react";
import store from "../../../../Redux/store";
import notify from "../../../../Services/Notification";
import { countCustomers } from "../../../../Web API/AdminApi";
import "./TotalCustomers.css";

function TotalCustomers(): JSX.Element {

    const [count, setCount] = useState<number>(store.getState().customersAppState.customers.length);

    useEffect(() => {
        countCustomers()
            .then(res => setCount(res.data))
            .catch(err => notify.error(err));
    }, []);

    useEffect(() => {
        return store.subscribe(() => {
            setCount(store.getState().customersAppState.customers.length); // Will let us notify
        })
    }, []);

    return (
        <div className="TotalCustomers">
            <span className={count > 0 ? "full_count" : "empty_count"}> {count} </span>
        </div>
    );
}

export default TotalCustomers;
