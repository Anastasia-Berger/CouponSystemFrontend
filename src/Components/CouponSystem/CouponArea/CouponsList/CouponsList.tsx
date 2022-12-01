import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CouponModel } from "../../../../Models/BeansModel/CouponModel";
import { Category } from "../../../../Models/Enums/Category";
import { ClientType } from "../../../../Models/Enums/ClientType";
import { couponsDownloadedAction } from "../../../../Redux/CouponsAppState";
import store from "../../../../Redux/store";
import notify, { ErrMsg } from "../../../../Services/Notification";
import { getAllCoupons } from "../../../../Web API/CouponsApi";

import AddButton from "../../../Shared/AddButton/AddButton";
import EmptyView from "../../../Shared/EmptyView/EmptyView";
import CouponItem from "../CouponItem/CouponItem";

import "./CouponsList.css";

function CouponsList(): JSX.Element {

    const navigate = useNavigate();
    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user?.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    }, [])

    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().couponsAppState.coupons);
    const [category, setCategory] = useState<string>("ALL");
    const [filter, setFilter] = useState<CouponModel[]>(coupons);
    const [price, setPrice] = useState<number>(0);

    // Side effects goes here
    useEffect(() => {
        if (coupons?.length === 0) {
            getAllCoupons()
                .then((res) => {
                    // Updating Component State
                    setCoupons(res.data);
                    // Updating global state
                    store.dispatch(couponsDownloadedAction(res.data));
                    // notify.success(SccMsg.GOT_TASKS);
                })
                .catch((err) => { /*notify.error(err);*/ });
        }
    }, []);

    const [myMaxPrice, setMaxPrice] = useState<number>();

    const maxPrice = () => {
        var price = 0;
        for (let i = 0; i < coupons.length; i++) {
            if (coupons[i].price || 0 > price) {
                price = coupons[i].price || 0;
            }
        }
        return price;
    };

    const [value, setValue] = useState<number | string | Array<number | string>>(maxPrice());
    useEffect(() => {
        setPrice(maxPrice());
    }, []);

    const handleSelect = (e: any) => {
        let filter = coupons;
        if (e !== "ALL") {
            filter = coupons.filter((c) => {
                return c.category === e.target.value;
            });
        }
        setCategory(e.target.value);
        setFilter(filter);
    }

    const handleInput = (e: any) => {
        setPrice(e.target.value);
    }

    return (
        <div className="CouponsList">

            <div className="page-title">

                <h2>All Coupons</h2>

                {(store.getState().authReducer.user?.clientType == ClientType.COMPANY ?
                    <>
                        <Link to="/companies/coupons/add">
                            <AddButton value={"Coupon"} />
                        </Link>
                    </> : <></>)}

                <div className="filter">
                    <select onChange={handleSelect} placeholder="category" id="category">
                        <option value="" disabled={true} selected style={{ color: "black" }}>Category</option>
                        <option value="ALL">ALL</option>
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

                    <input onInput={handleInput} type="range" max={500} className="slider"/> {price}
                </div>

            </div>


            {(coupons?.length > 0) ?
                <>
                    <div className="Container">

                        {(category === "ALL" ? coupons : filter).filter((c) => {
                            return c.price! > price;
                        }).map(t => <CouponItem key={t.id} coupon={t} />)}



                        {/* {coupons.map((coupon) => <CouponItem key={coupon.id} coupon={coupon} />)} */}
                    </div>
                </>
                :
                <> <EmptyView msg="NO COUPONS FOR YOU" /> </>}
        </div>
    );
}

export default CouponsList;
