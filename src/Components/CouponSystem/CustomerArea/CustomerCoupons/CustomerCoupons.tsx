// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { FiPlusCircle } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { CouponModel } from "../../../../Models/BeansModel/CouponModel";
// import { Category } from "../../../../Models/Enums/Category";
// import { couponsDownloadedAction } from "../../../../Redux/CouponsAppState";
// import store from "../../../../Redux/store";
// import notify, { ErrMsg, SccMsg } from "../../../../Services/Notification";
// import { getAllCustomerCoupons } from "../../../../Web API/CustomerApi";
// import CustomLink from "../../../Shared/CustomLink/CustomLink";
// import EmptyView from "../../../Shared/EmptyView/EmptyView";
// import CouponItem from "../../CompanyArea/Coupons/CouponItem/CouponItem";
// import "./CustomerCoupons.css";

// function CustomerCoupons(): JSX.Element {

//     const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().couponsAppState.coupons);

//     const navigate = useNavigate();
//     const [category, setCategory]: any = useState("");
//     console.log("Selected!!!: " + category);

//     const [price, setPrice] = useState<number>();

//     //Step 6: Validation Schema
//     const schema = yup.object().shape({
//         maxPrice: yup.number().min(0),
//     });

//     //Step 7: React-hook-form
//     const {register,handleSubmit,formState: { errors, isDirty, isValid },} = useForm<CouponModel>({
//         mode: "all",resolver: yupResolver(schema),
//     });

//     // console.log("CouponsList" + store.getState().couponsReducer.coupons);

//     const [email, setEmail] = useState(store.getState().authReducer.user?.email);



//     useEffect(() => {
//         if (
//             store.getState().authReducer.user?.clientType !== null &&
//             store.getState().couponsAppState.coupons.length === 0
//         ) {
//             getAllCustomerCoupons()
//                 .then((res) => {
//                     // notify.success(SccMsg.ALL_COUPONS); //two notifications on change
//                     // Update Component State (Local state)
//                     console.log("res data<><><>" + res.data);
//                     setCoupons(res.data);
//                     // Update App State (Global State)
//                     store.dispatch(couponsDownloadedAction(res.data));
//                 })
//                 .catch((err) => {
//                     notify.error(err);
//                 });
//         }
//     }, []);

//     //On-submit Category Selection:  Send to remote as post request
//     const selected = async () => {
//         if (
//             category === Category.FOOD ||
//             category === Category.RESTAURANT||
//             category === Category.VACATION||
//             category === Category.CLOTHING||
//             category === Category.TOYS||
//             category === Category.PHARMA||
//             category === Category.SPORTS||
//             category === Category.ELECTRONICS||
//             category === Category.GAMING
//         ) {
//             console.log("SELECTED***");
//             console.log(store.getState().couponsAppState.coupons.length);
//             navigate("/customers/coupons/category/" + category);
//         }

//     };

//     // //Step 8: On-submit:
//     // const getMaxPrice = (price: CouponModel) => {
//     //     navigate("/customers/coupons/maxPrice/" + price.maxPrice);
//     // };

//     //Did change?
//     useEffect(() => {
//         selected();
//     }, [category]);

//     return (
//         <div className="CustomerCoupons flex-center-col">
//             {userType === null ||
//                 store.getState().authReducer.user.clientType !== "CUSTOMER" ? (
//                 <>
//                     <EmptyView msg={"Sorry! This is a customer page only!"} />
//                 </>
//             ) : (
//                 <>
//                     <h1>{email} Coupons</h1>
//                     {/* Step 9: Step 9 - OnSubmit - handle onSubmit method using your method */}
//                     <div>
//                         {/* <form onSubmit={handleSubmit(getMaxPrice)}> */}

//                             <label htmlFor="maxPrice">Maximum Price</label>
//                             <input
//                                 {...register("maxPrice")}
//                                 type="number"
//                                 placeholder="max"
//                                 id="maxPrice"
//                                 onChange={(args) =>
//                                     setPrice(+(args.target as HTMLInputElement).value)
//                                 }
//                             />
//                             <span>{errors?.maxPrice?.message}</span>

//                             <Button
//                                 variant="secondary"
//                                 type="submit"
//                                 disabled={!isValid}
//                                 className="mt-1 btn-sm"
//                             >
//                                 Submit
//                             </Button>
//                         </form>
//                         <div className="margin-top">
//                             <Form.Select value={cat} onChange={(e) => setCat(e.target.value)}>
//                                 <option>Select a category</option>
//                                 <option value={Category.TRAVEL}>TRAVEL</option>
//                                 <option value={Category.RESTAURANTS}>RESTAURANTS</option>
//                                 <option value={Category.ENTERTAINMENT}>ENTERTAINMENT</option>
//                                 <option value={Category.FASHION}>FASHION</option>
//                                 <option value={Category.ELECTRONICS}>ELECTRONICS</option>
//                             </Form.Select>
//                         </div>
//                     </div>
//                     <div>
//                         <div className="flex-row-none-wrap-list">
//                             {coupons.length > 0 && userType === UserTypes.CUSTOMER ? (
//                                 coupons.map((c) => <CustomerCouponBoot key={c.id} coupon={c} />)
//                             ) : (
//                                 <EmptyView msg={"No coupons today"} />
//                             )}
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default CustomerCoupons;
