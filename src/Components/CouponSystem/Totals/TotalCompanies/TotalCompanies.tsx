import { useEffect, useState } from "react";
import store from "../../../../Redux/store";
import notify from "../../../../Services/Notification";
import { countCompanies } from "../../../../Web API/AdminApi";
import "./TotalCompanies.css";

function TotalCompanies(): JSX.Element {

    const [count, setCount] = useState<number>(
        store.getState().companiesAppState.companies.length);

    useEffect(() => {
        countCompanies()
            .then(res => setCount(res.data))
            .catch(err => notify.error(err));
    }, []);

    useEffect(() => {
        return store.subscribe(() => {
            setCount(store.getState().companiesAppState.companies.length); // Will let us notify
        })
    },[]);

    return (
        <div className="TotalCompanies">
            <span className={count > 0 ? "full_count" : "empty_count"}> {count} </span>
        </div>
    );
}

export default TotalCompanies;
