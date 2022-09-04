import { ClientType } from "../Enums/ClientType";

export class LoginModel {
    public email: string;
    public password?: string;
    public clientType?: ClientType;
    public token: string;

    public constructor(
        email?: string,
        password?: string,
        clientType?: ClientType,
        token?: string
    ) {
        this.email = email || '';
        this.password = password;
        this.clientType = clientType;
        this.token = token || '';
    }
}
