import { CouponModel } from "../Models/BeansModel/CouponModel";
import { Category } from "../Models/Enums/Category";
import globals from "../Services/Globals";
import tokenAxios from "../Services/InterceptorAxios";

export async function getAllCoupons() {
    return await tokenAxios.get<CouponModel[]>(globals.urls.coupons);
}

export async function getAllCouponsByCategory(category: string) {
    return await tokenAxios.get<CouponModel[]>(
        globals.urls.coupons +"category/" + category);
}

export async function getAllCouponsByMaxPrice(maxPrice: number) {
    return await tokenAxios.get<CouponModel[]>(
        globals.urls.coupons + "price/" + maxPrice
    );
}

export async function getAllCouponsByCompany(company: string) {
    return await tokenAxios.get<CouponModel[]>(
        globals.urls.companies + "/coupons/company?company=" + company
    );
}