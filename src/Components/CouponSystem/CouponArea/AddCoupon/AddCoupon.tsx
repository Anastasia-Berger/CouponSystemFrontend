import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CouponModel } from "../../../../Models/BeansModel/CouponModel";
import { Category } from "../../../../Models/Enums/Category";
import { couponAddedAction } from "../../../../Redux/CouponsAppState";
import store from "../../../../Redux/store";
import notify, { ErrMsg, SccMsg } from "../../../../Services/Notification";
import { addCoupon } from "../../../../Web API/CompanyApi";
import "./AddCoupon.css";
import { BsCalendar2Check, BsCalendar2X, BsCashCoin, BsFonts, BsGrid, BsImage, BsInfoLg, BsJustifyLeft } from "react-icons/bs";


function AddCoupon(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    const schema = yup.object().shape({
        category:
            yup.string()
                .required("Category is required"),

        title:
            yup.string()
                .required("title is required"),

        description:
            yup.string()
                .required("description is required"),

        startDate: yup
            .date()
            .min(new Date(), "Insert Start Date? come on!")
            .default(new Date())
            .typeError("You must specify a Start Date")
            .required("Start Date is required")
            .nullable(),

        endDate: yup
            .date()
            .min(yup.ref("startDate"), "end date can't be before start date")
            .default(new Date())
            .typeError("You must specify a End Date")
            .required("End Date is required")
            .nullable(),

        amount:
            yup.number()
                .min(0, ("can't be zero")),

        price:
            yup.number()
                .min(0, "can't be zero"),

        image:
            yup.string()
                // .required("Image is required")
    });


    const { register, handleSubmit, formState: { errors, isDirty, isValid } }
        = useForm<CouponModel>({ mode: "all", resolver: yupResolver(schema) });

    const sendToRemote = async (coupon: CouponModel) => {
        await addCoupon(coupon)
            .then(res => {
                notify.success(SccMsg.ADD_COUPON);
                // Updating global state
                store.dispatch(couponAddedAction(res.data));
                navigate('/companies/coupons');
            })
            .catch(err => {
                notify.error(err);
                console.log(err);
                console.log(err.message);
            });
    }


    return (
        <div className="AddCoupon">

            <h2>Add new coupon</h2>
            <form onSubmit={handleSubmit(sendToRemote)}>
                <hr />

                <label htmlFor="category" className="icon"><BsInfoLg /></label>
                <select {...register("category")} id="category">
                    <option value="" disabled={true} selected style={{ color: "black" }}>Category</option>
                    <option value="FOOD">{Category.FOOD}</option>
                    <option value="RESTAURANT">{Category.RESTAURANT}</option>
                    <option value="VACATION">{Category.VACATION}</option>
                    <option value="CLOTHING">{Category.CLOTHING}</option>
                    <option value="TOYS">{Category.TOYS}</option>
                    <option value="PHARMA">{Category.PHARMA}</option>
                    <option value="SPORTS">{Category.SPORTS}</option>
                    <option value="ELECTRONICS">{Category.ELECTRONICS}</option>
                    <option value="GAMING">{Category.GAMING}</option>
                </select>

                <label htmlFor="title" className="icon"><BsFonts /></label>
                <input type="text" {...register("title")} placeholder="Please enter title" name="title" id="title" />
                <span>{errors.title?.message}</span>
                <br />

                <label htmlFor="description" className="icon"><BsJustifyLeft /></label>
                <input {...register("description")} type="text" placeholder="Please enter description" name="description" id="description" />
                <span>{errors.description?.message}</span>
                <br />

                <label htmlFor="startDate" className="icon"><BsCalendar2Check /></label>
                <input {...register("startDate")} type="date" placeholder="Please enter start date" name="startDate" id="startDate" />
                <span>{errors.startDate?.message}</span>
                {/* <br /> */}

                <label htmlFor="endDate" className="icon"><BsCalendar2X /></label>
                <input {...register("endDate")} type="date" placeholder="Please enter end date" name="endDate" id="endDate" />
                <span>{errors.endDate?.message}</span>
                <br />

                <label htmlFor="amount" className="icon"><BsGrid /></label>
                <input {...register("amount")} type="number" placeholder="Please enter amount" name="amount" id="amount" />
                <span>{errors.amount?.message}</span>
                <br />

                <label htmlFor="price" className="icon"><BsCashCoin /></label>
                <input {...register("price")} type="number" placeholder="Please enter price" name="price" id="price" />
                <span>{errors.price?.message}</span>
                <br />

                <label htmlFor="imageUrl" className="icon"><BsImage /></label>
                <input {...register("imageUrl")} type="text" placeholder="Please enter image url" name="image" id="image" />
                <span>{errors.imageUrl?.message}</span>
                <br />

                <button disabled={!isValid}>ADD</button>
            </form>
        </div>
    );
}
export default AddCoupon;
