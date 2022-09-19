import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customerDeletedAction } from "../../../../../Redux/CustomersAppState";
import store from "../../../../../Redux/store";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import { deleteCustomer } from "../../../../../Web API/AdminApi";
import "./DeleteCustomer.css";

function DeleteCustomer(): JSX.Element {
        
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
    },[])


    const yes = () => {
        deleteCustomer(id)
            .then(any => {
                notify.success(SccMsg.DELETE_CUSTOMER);
                // Updating global state
                store.dispatch(customerDeletedAction(id));
                navigate('/customers');
            })
            .catch(err => notify.error(err));
    }

    const no = () => {
        navigate('/customers');
    }

    return (
        <div className="DeleteCustomer">
            <p>Are you sure you want to delete customer? id={id}?</p>
            <div>
                <button onClick={yes}>Yes</button>
                <button onClick={no}>No</button>
            </div>
        </div>
    );
}

export default DeleteCustomer;
