//"token" must be the same name as the response on the backend: LoginResDto
export class UserModel {
    
    // public name: string;
    public email: string;
    public clientType: string;
    public token: string;

    public constructor(
        // name?: string,
        email?: string,
        clientType?: string,
        token?: string
    ) {
        // this.name = name || '';
        this.email = email || '';
        this.clientType = clientType || '';
        this.token = token || '';
    }
}
