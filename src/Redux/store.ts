import { combineReducers } from "redux";
import { legacy_createStore as createStore} from 'redux'
import { authReducer } from "./AuthAppState";
import { companiesReducer } from "./CompaniesAppState";
import { couponsReducer } from "./CouponsAppState";


//Multiple Reducers
const reducers = combineReducers({
    couponState: couponsReducer,
    companiesState: companiesReducer,
    authState: authReducer
});

const store = createStore(reducers);


export default store;