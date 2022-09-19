import { combineReducers } from "redux";
import { legacy_createStore as createStore} from 'redux'
import { authReducer } from "./AuthAppState";
import { companiesReducer } from "./CompaniesAppState";
import { couponsReducer } from "./CouponsAppState";
import { customersReducer } from "./CustomersAppState";


//Multiple Reducers
const reducers = combineReducers({
    couponsAppState: couponsReducer,
    companiesAppState: companiesReducer,
    customersAppState: customersReducer,
    authReducer: authReducer
});

const store = createStore(reducers);


export default store;