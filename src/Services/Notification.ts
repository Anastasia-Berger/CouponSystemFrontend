import { Notyf } from 'notyf'

export enum SccMsg {
    ADDED_TASK = 'Added task successfully',
    UPDATED_TASK = 'Updated task successfully',
    DELETED_TASK = 'Deleted task successfully',
    GOT_TASKS = 'got tasks successfully',
    GOT_SINGLE_TASK = 'got task successfully',
    LOGOUT_SUCCESS = 'logout successfully',
    LOGIN_SUCCESS = 'login successfully',
    REGISTER_SUCCESS = 'register successfully'
}

export enum ErrMsg {
    PLS_LOGIN = 'please login'
}

class Notify {

    private notification = new Notyf({ duration: 4000, position: { x: "left", y: "top" } });
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


        return "Miaouuuu, an error occurred, please try again.";


    }
}
const notify = new Notify();
export default notify;