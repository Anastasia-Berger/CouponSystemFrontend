import { CouponModel } from "../Models/BeansModel/CouponModel";
import { CustomerModel } from "../Models/BeansModel/CustomerModel";

// Step 1 - Create AppState and manage the collection once and in a centralize place
export class CustomersAppState {
    public customers: CustomerModel[] = [];
    public coupons: CouponModel[] = [];
}


// Step 2 - Define all possible action for your application state
export enum CustomersActionType {
    CustomersDownloaded = "CustomersDownloaded",
    CustomerAdded = "CustomerAdded",
    CustomerUpdated = "CustomerUpdated",
    CustomerDeleted = "CustomerDeleted",
    CustomersClear = "CustomersClear",
    PurchaseCouponAction = "PurchaseCouponAction"
}


// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface CustomerAction {
    type: CustomersActionType;
    payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function customersDownloadedAction(customers: CustomerModel[]): CustomerAction {
    return { type: CustomersActionType.CustomersDownloaded, payload: customers };
}

export function customerAddedAction(customer: CustomerModel): CustomerAction {
    return { type: CustomersActionType.CustomerAdded, payload: customer };
}

export function customerUpdatedAction(customer: CustomerModel): CustomerAction {
    return { type: CustomersActionType.CustomerUpdated, payload: customer };
}

export function customerDeletedAction(id: number): CustomerAction {
    return { type: CustomersActionType.CustomerDeleted, payload: id };
}

export function customersClearAction(): CustomerAction {
    return { type: CustomersActionType.CustomersClear, payload: {} };
}

export function PurchaseCouponAction(coupon: CouponModel): CustomerAction {
    return { type: CustomersActionType.PurchaseCouponAction, payload: coupon };
}

// Step 5 - Reducer function perform the required action
export function customersReducer(currentState: CustomersAppState = new CustomersAppState(), action: CustomerAction): CustomersAppState {
    const newState = { ...currentState } //Spread Operator
    switch (action.type) {
        case CustomersActionType.CustomersDownloaded:
            newState.customers = action.payload;
            break;
        case CustomersActionType.CustomerAdded:
            newState.customers.push(action.payload);
            break;
        case CustomersActionType.CustomerUpdated:
            const idx = newState.customers.findIndex(customer => customer.id === action.payload.id);
            newState.customers[idx] = action.payload;
            break;
        case CustomersActionType.CustomerDeleted:
            newState.customers = newState.customers.filter(customer => customer.id !== action.payload);
            break;
        case CustomersActionType.CustomersClear:
            newState.customers = [];
            break;
        case CustomersActionType.PurchaseCouponAction:
            newState.coupons = newState.coupons.filter(coupon => coupon.id !== action.payload);
            break;
    }
    return newState;

}
