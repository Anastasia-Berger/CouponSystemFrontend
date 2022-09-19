export class CredentialsModel {
    public firstName?: string;
    public lastName?: string;
    public email?: string;
    public password?: string;
    public clientType?: string;

    public constructor(
        firstName?: string,
        lastName?: string,
        email?: string,
        password?: string,
        clientType?: string
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.clientType = clientType;
    }
}