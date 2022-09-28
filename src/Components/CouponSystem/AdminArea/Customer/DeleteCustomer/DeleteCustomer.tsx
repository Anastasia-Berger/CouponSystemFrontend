import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customerDeletedAction } from "../../../../../Redux/CustomersAppState";
import store from "../../../../../Redux/store";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import { deleteCustomer } from "../../../../../Web API/AdminApi";
import "./DeleteCustomer.css";

function DeleteCustomer(): JSX.Element {

    const navigate = useNavigate();
    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user.token) {
            console.log(store.getState().authReducer.user);
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    const params = useParams();
    const id = +(params.id || '');

    const yes = () => {
        deleteCustomer(id)
            .then(any => {
                notify.success(SccMsg.DELETE_CUSTOMER);
                // Updating global state
                store.dispatch(customerDeletedAction(id));
                navigate('/admin/customers');
            })
            .catch(err => notify.error(err));
    }

    const no = () => {
        navigate('/admin/customers');
    }

    return (
        <div className="DeleteCustomer">
            <h2>Delete Customer</h2>
            <p>Are you sure you want to delete customer id={id}?</p>
            <div className="buttons">
                <button onClick={yes} className='yes'>Yes</button>
                <button onClick={no} className='no'>No</button>
            </div>
        </div>
    );
}

export default DeleteCustomer;
