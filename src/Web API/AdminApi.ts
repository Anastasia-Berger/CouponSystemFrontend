import { CompanyModel } from "../Models/BeansModel/CompanyModel"
import { CouponModel } from "../Models/BeansModel/CouponModel";
import { CustomerModel } from "../Models/BeansModel/CustomerModel";
import globals from "../Services/Globals";
import tokenAxios from "../Services/InterceptorAxios";

export async function addCompany(company: CompanyModel) {
    return await tokenAxios.post<CompanyModel>(
        globals.urls.admin + "/companies", company
    );
}

export async function updateCompany(id: number, company: CompanyModel){
    return await tokenAxios.put<CompanyModel>(
        globals.urls.admin + "/companies/" + id, company
    );
}

export async function deleteCompany(id: number) {
    return await tokenAxios.delete<any>(
        globals.urls.admin + '/companies/' + id);
}

export async function getAllCompanies() {
    return await tokenAxios.get<CompanyModel[]>(
        globals.urls.admin + '/companies');
}

export async function getSingleCompany(id: number) {
    return await tokenAxios.get<CompanyModel>(
        globals.urls.admin + '/companies/' + id
    );
}

export async function addCustomer(customer: CustomerModel) {
    return await tokenAxios.post<CustomerModel>(
        globals.urls.admin + '/customers',
        customer
    );
}

export async function updateCustomer(id: number, customer: CustomerModel){
    return await tokenAxios.put<CustomerModel>(
        globals.urls.admin + "/customers" + id,
        customer
    );
}

export async function deleteCustomer(id: number) {
    return await tokenAxios.delete<any>(
        globals.urls.admin + "/customers/" + id);
}

export async function getAllCustomers() {
    return await tokenAxios.get<CustomerModel[]>(
        globals.urls.admin + "/customers");
}

export async function getSingleCustomer(id: number) {
    return await tokenAxios.get<CustomerModel>(
        globals.urls.admin + "/customers/" + id
    );
}


export async function countCompanies() {
    return await tokenAxios.get<number>(globals.urls.admin + '/companies/count');
};

export async function countCustomers() {
    return await tokenAxios.get<number>(globals.urls.admin + '/customers/count');
};

export async function countCoupons() {
    return await tokenAxios.get<number>(globals.urls.admin + '/coupons/count');
};