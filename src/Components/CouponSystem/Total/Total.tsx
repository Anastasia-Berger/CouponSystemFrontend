import { useEffect, useState } from "react";
import { countCoupons } from "../../../Web API/CouponsApi";
import notify from "../../../Services/Notification";
import "./Total.css";

function Total(): JSX.Element {

    const [count, setCount] = useState<number>(0);
    
    useEffect(() => {
        countCoupons()
            .then(res => setCount(res.data))
            .catch(err => notify.error(err));
    }, []);

    return (
        <div className="Total">
            <p>Total tasks remaining : 

            <span className={count>0 ? "full_count":"empty_count"}> {count} </span>

            </p>
            
        </div>
    );
}

export default Total;
