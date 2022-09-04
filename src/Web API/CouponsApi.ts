import axios from "axios";
import { CouponModel } from "../Models/BeansModel/CouponModel";
import globals from "../Services/Globals";


export async function getCoupons() {
    return await axios.get<CouponModel[]>(globals.urls.coupons);
}

export async function getCoupon(id: number) {
    return await axios.get<CouponModel>(globals.urls.coupons + id);
}

export async function countCoupons() {
    return await axios.get<number>(globals.urls.coupons + 'count');
}

export async function addCoupon(coupon: CouponModel) {
    return await axios.post<CouponModel>(globals.urls.coupons, coupon);
}

export async function deleteCoupon(id: number) {
    return await axios.delete<any>(globals.urls.coupons + id);
}

export async function updateCoupon(id: number, coupon: CouponModel) {
    return await axios.put<any>(globals.urls.coupons + id, coupon);
}