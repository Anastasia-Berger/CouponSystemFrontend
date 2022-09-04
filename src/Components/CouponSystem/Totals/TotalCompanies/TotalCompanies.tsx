import { useEffect, useState } from "react";
import notify from "../../../../Services/Notification";
import { countCompanies } from "../../../../Web API/CompanyApi";
import "./TotalCompanies.css";

function TotalCompanies(): JSX.Element {

    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        countCompanies()
            .then(res => setCount(res.data))
            .catch(err => notify.error(err));
    }, []);

    return (
        <div className="TotalCompanies">
            <span className={count > 0 ? "full_count" : "empty_count"}> {count} </span>
        </div>
    );
}

export default TotalCompanies;
