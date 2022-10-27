import { CouponModel } from "../Models/BeansModel/CouponModel";
import globals from "../Services/Globals";
import tokenAxios from "../Services/InterceptorAxios";

export async function getAllCoupons() {
    return await tokenAxios.get<CouponModel[]>(
        globals.urls.admin + "/coupons");
}

export async function getAllCouponsByCategory(category: string) {
    return await tokenAxios.get<CouponModel[]>(
        globals.urls.companies + "/coupons/category?category=" + category
    );
}

export async function getAllCouponsByMaxPrice(maxPrice: number) {
    return await tokenAxios.get<CouponModel[]>(
        globals.urls.companies + "/coupons/price/max?value=" + maxPrice
    );
}

export async function getAllCouponsByCompany(company: string) {
    return await tokenAxios.get<CouponModel[]>(
        globals.urls.companies + "/coupons/company?company=" + company
    );
}