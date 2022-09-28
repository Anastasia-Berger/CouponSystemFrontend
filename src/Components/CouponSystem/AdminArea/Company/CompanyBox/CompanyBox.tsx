import { useEffect, useState } from "react";
import { BsGear, BsTrash } from "react-icons/bs";
import { FiUserX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../../../Models/BeansModel/CompanyModel";
import { ClientType } from "../../../../../Models/Enums/ClientType";
import store from "../../../../../Redux/store";
import notify, { ErrMsg } from "../../../../../Services/Notification";
import { getAllCompanyCoupons } from "../../../../../Web API/CompanyApi";
import CustomLink from "../../../../Shared/CustomLink/CustomLink";
import TotalCoupons from "../../../Totals/TotalCuopons/TotalCoupons";
import "./CompanyBox.css";

interface CompanyBoxProps {
    company: CompanyModel;
}

function CompanyBox(props: CompanyBoxProps): JSX.Element {

    const [count, setCount] = useState<number>(store.getState().couponsAppState.coupons.length);
    
    useEffect(() => {
            getAllCompanyCoupons()
                .then(res => setCount(res.data.length))
                .catch(err => notify.error(err));
        
    }, []);

    // useEffect(() => {
    //     return store.subscribe(() => {
            
    //         getAllCompanyCoupons()
    //             .then(res => setCount(store.getState().couponsAppState.coupons.length)) // Will let us notify)
    //             .catch(err => notify.error(err));
    //     })
    // }, []);

    return (


        <div className="CompanyBox">

            <div className="buttons">
                {/* ADMIN EDIT BUTTONS */}
                {(store.getState().authReducer.user?.clientType == ClientType.ADMINISTRATOR)
                    ?
                    <>
                        <CustomLink to={`/admin/companies/delete/${props.company.id}`}>
                            <div className="nav-item">
                                <BsTrash size={20} className='react-icons' />
                            </div>
                        </CustomLink>

                        <CustomLink to={`/admin/companies/edit/${props.company.id}`}>
                            <div className="nav-item">
                                <BsGear size={20} className='react-icons' />
                            </div>
                        </CustomLink>

                    </> : <></>}
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
