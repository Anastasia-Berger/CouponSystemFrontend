import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { companyDeletedAction } from "../../../../../Redux/CompaniesAppState";
import store from "../../../../../Redux/store";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import { deleteCompany } from "../../../../../Web API/AdminApi";
import "./DeleteCompany.css";

function DeleteCompany(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || '');


    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user.token) {
            console.log(store.getState().authReducer.user);
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])


    const yes = () => {
        deleteCompany(id)
            .then(any => {
                notify.success(SccMsg.DELETE_COMPANY);
                // Updating global state
                store.dispatch(companyDeletedAction(id));
                navigate('/admin/companies');
            })
            .catch(err => notify.error(err));
    }

    const no = () => {
        navigate('/companies');
    }

    return (
        <div className="DeleteCompany">
            <h2>Delete Company</h2>
            <p>Are you sure you want to delete company id={id}?</p>
            <div>
                <button onClick={yes}>Yes</button>
                <button onClick={no}>No</button>
            </div>
        </div>
    );
}

export default DeleteCompany;
