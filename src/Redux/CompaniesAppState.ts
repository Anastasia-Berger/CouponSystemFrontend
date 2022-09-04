import { CompanyModel } from "../Models/BeansModel/CompanyModel";

// Step 1 - Create AppState and manage the collection once and in a centralize place
export class CompaniesAppState {
    public companies: CompanyModel[] = [];
}


// Step 2 - Define all possible action for your application state
export enum CompaniesActionType {
    CompaniesDownloaded = "CompaniesDownloaded",
    CompanyAdded = "CompanyAdded",
    CompanyUpdated = "CompanyUpdated",
    CompanyDeleted = "CompanyDeleted",
    CompaniesClear = "CompaniesClear"
}


// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface CompanyAction {
    type: CompaniesActionType;
    payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function companiesDownloadedAction(companies: CompanyModel[]): CompanyAction {
    return { type: CompaniesActionType.CompaniesDownloaded, payload: companies };
}

export function companyAddedAction(company: CompanyModel): CompanyAction {
    return { type: CompaniesActionType.CompanyAdded, payload: company };
}

export function companyUpdatedAction(company: CompanyModel): CompanyAction {
    return { type: CompaniesActionType.CompanyUpdated, payload: company };
}

export function companyDeletedAction(id: number): CompanyAction {
    return { type: CompaniesActionType.CompanyDeleted, payload: id };
}

export function companiesClearAction(): CompanyAction {
    return { type: CompaniesActionType.CompaniesClear, payload: {} };
}

// Step 5 - Reducer function perform the required action
export function companiesReducer(currentState: CompaniesAppState = new CompaniesAppState(), action: CompanyAction): CompaniesAppState {
    const newState = { ...currentState } //Spread Operator
    switch (action.type) {
        case CompaniesActionType.CompaniesDownloaded:
            newState.companies = action.payload;
            break;
        case CompaniesActionType.CompanyAdded:
            newState.companies.push(action.payload);
            break;
        case CompaniesActionType.CompanyUpdated:
            const idx = newState.companies.findIndex(company => company.id === action.payload.id);
            newState.companies[idx] = action.payload;
            break;
        case CompaniesActionType.CompanyDeleted:
            newState.companies = newState.companies.filter(company => company.id !== action.payload);
            break;
        case CompaniesActionType.CompaniesClear:
            newState.companies = [];
            break;
    }
    return newState;

}
