import axios from "axios";
import { CompanyModel } from "../Models/CompanyModel";
import globals from "../Services/Globals";

export async function getCompanies() {
    return await axios.get<CompanyModel[]>(globals.urls.companies);
}

export async function getCoupon(id: number) {
    return await axios.get<CompanyModel>(globals.urls.companies + id);
}

export async function addCoupon(company: CompanyModel) {
    return await axios.post<CompanyModel>(globals.urls.companies, company);
}

export async function deleteCoupon(id: number) {
    return await axios.delete<any>(globals.urls.companies + id);
}

export async function updateCoupon(id: number, company: CompanyModel) {
    return await axios.put<any>(globals.urls.companies + id, company);
}