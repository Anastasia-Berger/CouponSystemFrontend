import { useEffect, useState } from "react";
import { BsGear, BsTrash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../../../Models/BeansModel/CompanyModel";
import store from "../../../../../Redux/store";
import notify, { ErrMsg } from "../../../../../Services/Notification";
import { getAllCompanyCoupons } from "../../../../../Web API/CompanyApi";
import TotalCoupons from "../../../Totals/TotalCuopons/TotalCoupons";
import "./CompanyBox.css";

interface CompanyBoxProps {
    company: CompanyModel;
}

function CompanyBox(props: CompanyBoxProps): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user?.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    const [count, setCount] = useState<number>(store.getState().couponsAppState.coupons.length);
    
    useEffect(() => {
            getAllCompanyCoupons()
                .then(res => setCount(res.data.length))
                .catch(err => notify.error(err));
        
    }, []);

    useEffect(() => {
        return store.subscribe(() => {
            
            getAllCompanyCoupons()
                .then(res => setCount(store.getState().couponsAppState.coupons.length)) // Will let us notify)
                .catch(err => notify.error(err));
        })
    }, []);

    return (


        <div className="CompanyBox">

            <div className="buttons">

                {(store.getState().authReducer.user?.clientType === "ADMINISTRATOR") ? (
                    <>
                        <Link to={`/companies/delete/${props.company.id}`}><button><BsTrash size={20} /></button></Link>
                        <Link to={`/companies/edit/${props.company.id}`}><button><BsGear size={20} /></button></Link>
                    </>
                ) : (<></>)}

            </div>

            <div className="BoxImage">
                <img src={props.company.image} alt={props.company.name} />
            </div>

            <div className="CompanyDetails">
                <p>ID : {props.company.id} </p>
                <p>Name : {props.company.name}</p>
                <p>Coupons : {count} </p>
            </div>

        </div >
    );
}

export default CompanyBox;
