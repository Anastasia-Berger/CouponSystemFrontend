
import { CouponModel } from "../Models/BeansModel/CouponModel";
import { CustomerModel } from "../Models/BeansModel/CustomerModel";
import { Category } from "../Models/Enums/Category";
import globals from "../Services/Globals";
import axios from 'axios';
import tokenAxios from "../Services/InterceptorAxios";
import { LoginModel } from "../Models/Identification/LoginModel";

export async function purchaseCoupon(id: number): Promise<any> {
    return await tokenAxios.post<CouponModel>(globals.urls.coupons + id);
}

export async function getAllCustomerCoupons(): Promise<any> {
    return await tokenAxios.get<CouponModel[]>(globals.urls.coupons);
}

export async function getAllCustomerCouponsByCategory(category: Category): Promise<any> {
    return await tokenAxios.get<CouponModel[]>(globals.urls.coupons + 'category/' + category);
}

export async function getAllCustomerCouponsByPrice(price: number): Promise<any> {
    return await tokenAxios.get<CouponModel[]>(globals.urls.coupons + 'price/' + price);
}

export async function getCustomerDetails(): Promise<any>{
    return await tokenAxios.get<CustomerModel>(globals.urls.customers + 'details');
}

export async function getAllCoupons(): Promise<any> {
    return await tokenAxios.get<CouponModel[]>(globals.urls.customers + 'allCoupons')
}

// LOGIN FUNCTIONALITY
export async function login(credentials: LoginModel) {
    return await axios.post<CustomerModel>(globals.urls.customers + '/login', credentials);
};