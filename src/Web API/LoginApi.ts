import axios from 'axios';
import { CredentialsModel } from '../Models/Identification/CredentialsModel';
import { UserModel } from '../Models/Identification/UserModel';
import globals from '../Services/Globals';

export async function registerRequest(credentials: CredentialsModel) {
    return await axios.post<any>(
        globals.urls.register, credentials
    );
};

export async function login(credentials: CredentialsModel) {
    return await axios.post<UserModel>(
        globals.urls.login, credentials
    );
};