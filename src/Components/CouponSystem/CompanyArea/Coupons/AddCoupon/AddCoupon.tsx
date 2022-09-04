import "./AddCoupon.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CouponModel } from "../../../../../Models/BeansModel/CouponModel";
import axios from "axios";

function AddCoupon(): JSX.Element {

    const schema = yup.object().shape({
        category:
            yup.string()
                .required("Category Name is required"),

        title:
            yup.string()
                .required("Title is required"),

        description:
            yup.string()
                .required("Description is required"),

        startDate:
            yup.date()
                // .max(new Date(), 'Umm... future dob? come on!')
                .default(new Date())
                .typeError("You must specify a start date.")
                .required("Start date is required")
                .nullable().default(() => new Date()),

        endDate:
            yup.date()
                // .max(new Date(), 'Umm... future dob? come on!')
                .default(new Date())
                .typeError("You must specify an expiration date.")
                .required("Expiration date is required")
                .nullable().default(() => new Date()),

        amount:
            yup.number()
                .moreThan(-1)
                .typeError("You must specify an amount")
                .required("Amount is required"),

        price:
            yup.number()
                .moreThan(-1)
                .typeError("You must specify a price")
                .required("Price is required"),

        // imageUrl:
        //     yup.string()
        //         .required("Image Url is required")

        // image:
        //     yup.mixed()
        //         .test('required', "You need to provide a file", (value) => {
        //             return value && value.length
        //         })
        //         .test("fileSize", "The file is too large", (value, context) => {
        //             return value && value[0] && value[0].size <= 200000;
        //         })
        //         .test("type", "We only support png", function (value) {
        //             return value && value[0] && value[0].type === "image/png";
        //         })

    });

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<CouponModel>({ mode: "all", resolver: yupResolver(schema) });


    const addCoupon = async (coupon: CouponModel) => {

        const formData = new FormData();

        formData.append("category", coupon.category as string);
        formData.append("title", coupon.title as string);
        formData.append("description", coupon.description as string);

        const stdt = (coupon.startDate?.toISOString().split('T')[0]);
        formData.append("startDate", stdt as string);

        const exp = (coupon.endDate?.toISOString().split('T')[0]);
        formData.append("endDate", exp as string);

        formData.append("amount", (coupon.amount as number).toString());
        formData.append("price", (coupon.price as number).toString());

        // formData.append("imageUrl", coupon.imageUrl as string);
        // formData.append("image", coupon.imageUrl?.item(0) as any);


        // sending post request to spring boot
        console.log(formData);
        await axios.post<CouponModel>('http://localhost:8080/admin/coupons/', formData)
            .then(res => { alert(JSON.stringify(res.data)) })
            .catch(err => { console.log(err); });

    }

    return (
        <div className="AddCoupon">
            <h2>Add Coupon</h2>

            <form onSubmit={handleSubmit(addCoupon)} >

                {
                    errors.category?.message ?
                        <>
                            <span>{errors?.category?.message}</span>
                        </> :
                        <>
                            <label htmlFor="category">Category</label>
                        </>
                }

                <select
                    {...register("category")}
                    id="category"
                    name="category" >
                    <option value="" disabled={true} selected style={{ color: 'gray' }}>Choose a category from list below</option>
                    <option value="GRAY">Gray</option>
                    <option value="REDDISH">Red</option>
                    <option value="BLACK">Black</option>
                    <option value="PURPLE">Purple</option>
                    <option value="PINK">Pink</option>
                    <option value="YELLOW">Yellow</option>
                    <option value="BLUE">Blue</option>
                    <option value="BROWN">Brown</option>
                </select>


                {
                    errors.title?.message ?
                        <><span>{errors?.title?.message}</span></> :
                        <><label htmlFor="title">Title</label></>
                }

                <input
                    {...register("title")}
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title"
                />


                {
                    errors.description?.message ?
                        <><span>{errors?.description?.message}</span></> :
                        <><label htmlFor="description">Description</label></>
                }

                <input
                    {...register("description")}
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Description"
                />


                {
                    errors.startDate?.message ?
                        <><span>{errors?.startDate?.message}</span></> :
                        <><label htmlFor="startDate">Start Date</label></>
                }

                <input
                    {...register("startDate")}
                    id="startDate"
                    name="startDate"
                    type="date"
                    placeholder="Start Date"
                />

                {
                    errors.endDate?.message ?
                        <><span>{errors?.endDate?.message}</span></> :
                        <><label htmlFor="endDate">End Date</label></>
                }

                <input
                    {...register("endDate")}
                    id="endDate"
                    name="endDate"
                    type="date"
                    placeholder="End Date"
                />

                {
                    errors.amount?.message ?
                        <><span>{errors?.amount?.message}</span></> :
                        <><label htmlFor="amount">Amount</label></>
                }

                <input
                    {...register("amount")}
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.1"
                    placeholder="Amount"
                />

                {
                    errors.price?.message ?
                        <><span>{errors?.price?.message}</span></> :
                        <><label htmlFor="price">Price</label></>
                }

                <input
                    {...register("price")}
                    id="price"
                    name="price"
                    type="number"
                    step="0.1"
                    placeholder="Price"
                />

{/* 
                {
                    errors.image?.message ?
                        <><span>{errors?.image?.message}</span></> :
                        <><label htmlFor="image">Image</label></>
                }
                <input
                    {...register("image", { onChange: (e) => { handleChangeImage(e) } })}
                    id="image"
                    name="image"
                    type="file"
                    placeholder="Cat Image..." />
                <div className="wrap-box">
                    {image ? <img src={image} alt=""></img> : 'no image yet!'}
                </div> */}


                <button disabled={!isValid}>ADD</button>

            </form>
        </div>
    );
}

export default AddCoupon;

