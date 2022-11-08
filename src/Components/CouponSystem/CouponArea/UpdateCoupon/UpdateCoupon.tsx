import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CouponModel } from "../../../../Models/BeansModel/CouponModel";
import store from "../../../../Redux/store";
import notify, { ErrMsg, SccMsg } from "../../../../Services/Notification";
import { updateCoupon } from "../../../../Web API/CompanyApi";
import { Category } from "../../../../Models/Enums/Category";
import { BsCalendar2Check, BsCalendar2X, BsCashCoin, BsFonts, BsGrid, BsImage, BsInfoLg, BsJustifyLeft } from "react-icons/bs";
import { couponUpdatedAction } from "../../../../Redux/CouponsAppState";
import "./UpdateCoupon.css";

function UpdateCoupon(): JSX.Element {

    const navigate = useNavigate();
    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    const params = useParams();
    const id = +(params.id || '');

    const [coupon, setCoupon] = useState<CouponModel>
        (store.getState().couponsAppState.coupons.filter(coupon => coupon.id === id)[0]);

    const [origin, setOrigin] = useState<CouponModel>({
        id: coupon.id,
        company: coupon.company,
        category: coupon.category,
        title: coupon.title,
        description: coupon.description,
        startDate: coupon.startDate,
        endDate: coupon.endDate,
        amount: coupon.amount,
        price: coupon.price,
        imageUrl: coupon.imageUrl,
    });


    const schema = yup.object().shape({
        category: yup.string()
            .required("Category is required"),
        title: yup.string()
            .required("title is required"),
        description: yup.string()
            .required("description is required"),
        startDate: yup.date()
            // .default(new Date())
            .typeError("You must specify a Start Date")
            .required("Start Date is required")
            .min(new Date(), "Insert Start Date? come on!")
            .nullable()
            .default(() => new Date()),
        endDate: yup.date()
            // .default(new Date())
            .min(yup.ref("startDate"), "End date can't be before start date")
            .typeError("You must specify a End Date")
            .required("End Date is required")
            .nullable()
            .default(() => new Date()),
        amount: yup.number()
            .min(0, ("can't be zero")),
        price: yup.number()
            .min(0, "can't be zero"),
        image: yup.string()
        // .required("Image is required")
    });

    const defaultValuesObj = { ...origin };


    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<CouponModel>({
            defaultValues: defaultValuesObj,
            mode: "all",
            resolver: yupResolver(schema)
        });

    const { dirtyFields } = useFormState({ control });

    const sendToRemote = async (coupon: CouponModel) => {
        updateCoupon(id, coupon)
            .then(res => {
                console.log(res.data);
                notify.success(SccMsg.UPDATE_COUPON);
                // Updating global state
                store.dispatch(couponUpdatedAction(res.data));
                navigate('/companies/coupons');
            })
            .catch(err => {
                notify.error(err);
                console.log(err);
                console.log(err.message);
            });
    }

    return (
        <div className="UpdateCoupon">

            <h2>Update coupon #{coupon.id}</h2>
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
                <span>{errors.category?.message}</span>

                <label htmlFor="title" className="icon"><BsFonts /></label>
                <input
                    type="text"
                    {...register("title")}
                    placeholder="Please enter title"
                    name="title"
                    id="title" />
                <span>{errors.title?.message}</span>
                <br />

                <label htmlFor="description" className="icon"><BsJustifyLeft /></label>
                <input
                    type="text"
                    {...register("description")}
                    placeholder="Please enter description"
                    name="description"
                    id="description"
                />
                <span>{errors.description?.message}</span>
                <br />

                <label htmlFor="startDate" className="icon"><BsCalendar2Check /></label>
                <input
                    type="date"
                    {...register("startDate")}
                    placeholder="Please enter start date"
                    name="startDate"
                    id="startDate"
                />
                <span>{errors.startDate?.message}</span>
                {/* <br /> */}

                <label htmlFor="endDate" className="icon"><BsCalendar2X /></label>
                <input
                    type="date"
                    {...register("endDate")}
                    placeholder="Please enter end date"
                    name="endDate"
                    id="endDate"
                />
                <span>{errors.endDate?.message}</span>
                <br />

                <label htmlFor="amount" className="icon"><BsGrid /></label>
                <input
                    type="number"
                    {...register("amount")}
                    placeholder="Please enter amount"
                    name="amount"
                    id="amount" />
                <span>{errors.amount?.message}</span>
                <br />

                <label htmlFor="price" className="icon"><BsCashCoin /></label>
                <input
                    type="number"
                    {...register("price")}
                    placeholder="Please enter price"
                    name="price"
                    id="price" />
                <span>{errors.price?.message}</span>
                <br />

                <label htmlFor="imageUrl" className="icon"><BsImage /></label>
                <input
                    type="text" {...register("imageUrl")}
                    placeholder="Please enter image url" />
                <span>{errors.imageUrl?.message}</span>

                <button disabled={!isDirty} className="button-app" >UPDATE</button>
            </form>
        </div>
    );
}

export default UpdateCoupon;
