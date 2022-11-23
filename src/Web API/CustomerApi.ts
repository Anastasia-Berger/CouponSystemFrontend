import { CouponModel } from "../Models/BeansModel/CouponModel"
import { CustomerModel } from "../Models/BeansModel/CustomerModel";
import globals from "../Services/Globals"
import tokenAxios from "../Services/InterceptorAxios"

// export async function getAllCoupons() {
//     return await tokenAxios.get<CouponModel[]>(
//         globals.urls.customers + "/allCoupons");
// }

// export async function getAllCouponsByCategory(category: string) {
//     return await tokenAxios.get<CouponModel[]>(
//         globals.urls.customers + "/allCoupons/" + category);
// }

export async function purchaseCoupon(id: number) {
    return await tokenAxios.post<CouponModel>(
        globals.urls.customers + '/purchase/' + id);
}

export async function getAllCustomerCoupons() {
    return await tokenAxios.get<CouponModel[]>
        (globals.urls.customers + '/coupons/purchased');
}

export async function getAllCustomerCouponsByCategory(category: string) {
    return await tokenAxios.get<CouponModel[]>(
        globals.urls.customers + '/coupons/category?category=' + category
    );
}

export async function getAllCustomerCouponsByMaxPrice(value: number) {
    return await tokenAxios.get<CouponModel[]>(
        globals.urls.customers + "/coupons/price/max?value=" + value
    );
}

export async function getCustomerDetails() {
    return await tokenAxios.get<CustomerModel>(
        globals.urls.customers + "/details"
    );
}