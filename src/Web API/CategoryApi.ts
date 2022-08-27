import axios from "axios";
import { CustomerModel } from "../Models/CustomerModel";
import globals from "../Services/Globals";

export async function getCustomer() {
    return await axios.get<CustomerModel[]>(globals.urls.companies);
}

export async function getCoupon(id: number) {
    return await axios.get<CustomerModel>(globals.urls.companies + id);
}
