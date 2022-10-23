import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { couponDeletedAction } from "../../../../Redux/CouponsAppState";
import store from "../../../../Redux/store";
import notify, { ErrMsg, SccMsg } from "../../../../Services/Notification";
import { deleteCoupon } from "../../../../Web API/CompanyApi";
import "./DeleteCoupon.css";

function DeleteCoupon(): JSX.Element {

    
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
        deleteCoupon(id)
            .then(any => {
                notify.success(SccMsg.DELETE_COUPON);
                // Updating global state
                store.dispatch(couponDeletedAction(id));
                navigate('/coupons');
            })
            .catch(err => notify.error(err));
    }

    const no = () => {
        navigate('/coupons');
    }


    return (
        <div className="DeleteCoupon">
			<h2>Delete Task</h2>
                <p>Are you sure you want to delete coupon id={id}?</p>
                <div>
                    <button onClick={yes}>Yes</button>
                    <button onClick={no}>No</button>
                </div>
        </div>
    );
}

export default DeleteCoupon;
