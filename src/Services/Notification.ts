import { Notyf } from 'notyf'




export enum SccMsg {
    ALL_COMPANIES = "got all companies successfully",
    SINGLE_COMPANY = "got single company successfully",
    DELETE_COMPANY = "deleted company successfully",
    UPDATE_COMPANY = "updated company successfully",
    ADD_COMPANY = "added company successfully",
    ALL_CUSTOMERS = "got all customers successfully",
    SINGLE_CUSTOMER = "got single customer successfully",
    DELETE_CUSTOMER = "deleted customer successfully",
    UPDATE_CUSTOMER = "updated customer successfully",
    ADD_CUSTOMER = "added customer successfully",
    ALL_COUPONS = "got all coupons successfully",
    COUPONS_CATEGORY = "got all coupons by category successfully",
    COUPONS_MAX_PRICE = "got all coupons by maximum price successfully",
    SINGLE_COUPON = "got single coupon successfully",
    DELETE_COUPON = "deleted coupon successfully",
    UPDATE_COUPON = "updated coupon successfully",
    ADD_COUPON = "added coupon successfully",
    LOGIN = "login request sent successfully",
    PURCHASED = "coupon purchased successfully",
    GOT_NAME = "got company name successfully",
    LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
    REGISTER_SUCCESS = "REGISTER_SUCCESS"
}




export enum ErrMsg {
    PLS_LOGIN = 'please login',
    FAIL_EDIT_COMPANIES = "failed to edit company",
    WRONG_LOGIN_DETAILS = "Wrong login details. Please try again",
    COUPON_NOT_FOUND = "COUPON_NOT_FOUND",
    COUPON_ALREADY_PURCHASED = "COUPON_ALREADY_PURCHASED"
}

class Notify {

    private notification = new Notyf({ 
        duration: 4000, 
        position: { x: "left", y: "top" } 
    });

    public success(message: string) {
        this.notification.success(message);
    }

    public error(err: any) {
        const msg = this.extractMsg(err);
        this.notification.error(msg);
    }

    private extractMsg(err: any): string {

        if (typeof err === 'string') {
            return err;
        }

        if (typeof err?.response?.data === 'string') { //Backend exact error
            return err.response.data;
        }

        if (Array.isArray(err?.response?.data)) { // Backend exact error list
            return err?.response?.data[0];
        }


        // Must be last
        if (typeof err?.message === 'string') {
            return err.message;
        }


        return "An error occurred, please try again.";


    }
}
const notify = new Notify();
export default notify;