export class RegisterModel {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public confirm: string;

    public constructor(
        firstName?: string,
        lastName?: string,
        email?: string,
        password?: string,
        confirm?: string
    ) {
        this.firstName = firstName || '';
        this.lastName = lastName || '';
        this.email = email || '';
        this.password = password || '';
        this.confirm = confirm || '';
    }
}