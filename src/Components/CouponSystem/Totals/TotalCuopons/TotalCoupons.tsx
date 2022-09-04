import { useEffect, useState } from "react";
import notify from "../../../../Services/Notification";
import { countCoupons } from "../../../../Web API/CouponsApi";
import "./TotalCoupons.css";

function TotalCoupons(): JSX.Element {

    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        countCoupons()
            .then(res => setCount(res.data))
            .catch(err => notify.error(err));
    }, []);
    return (
        <div className="TotalCoupons">
            <span className={count > 0 ? "full_count" : "empty_count"}> {count} </span>
        </div>
    );
}

export default TotalCoupons;
