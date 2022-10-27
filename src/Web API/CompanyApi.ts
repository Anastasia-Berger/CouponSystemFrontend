import { CompanyModel } from "../Models/BeansModel/CompanyModel";
import { CouponModel } from "../Models/BeansModel/CouponModel";
import globals from "../Services/Globals";
import tokenAxios from "../Services/InterceptorAxios";

export async function addCoupon(coupon: CouponModel) {
  return await tokenAxios.post<CouponModel>(
    globals.urls.companies + "/new-coupon", coupon
  );
}

export async function updateCoupon(id: number, coupon: CouponModel) {
  return await tokenAxios.put<CouponModel>(
    globals.urls.companies + "/coupon/" + id, coupon
  );
}

export async function deleteCoupon(id: number) {
  return await tokenAxios.delete<any>(
    globals.urls.companies + "/coupons/" + id
  );
}

export async function getAllCompanyCoupons() {
  return await tokenAxios.get<CouponModel[]>(
    globals.urls.companies + "/coupons"
  );
}

// export async function getCompanyAsList() {
//   return await tokenAxios.get<CouponModel[]>(
//     globals.urls.companies + "/currentAsList"
//   );
// }

export async function getSingleCoupon(id: number) {
  return await tokenAxios.get<CouponModel>(
    globals.urls.companies + "/coupons/" + id);
}

export async function getAllCompanyCouponsByCategory(category: string) {
  return await tokenAxios.get<CouponModel[]>(
    globals.urls.companies + "/coupons/category?" + category
  );
}

export async function getAllCompanyCouponsByMaxPrice(value: number) {
  return await tokenAxios.get<CouponModel[]>(
    globals.urls.companies + "/coupons/price/max?value=" + value
  );
}

export async function getCompanyDetails() {
  return await tokenAxios.get<CompanyModel>(globals.urls.companies + "/details");
}
