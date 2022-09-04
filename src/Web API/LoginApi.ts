import axios from 'axios';
import { LoginModel } from '../Models/Identification/LoginModel';
import globals from '../Services/Globals';

export async function registerRequest(credentials: LoginModel) {
    return await axios.post<any>(globals.urls.login + '/sign-up', credentials);
};

export async function login(credentials: LoginModel) {
    return await axios.post<LoginModel>(globals.urls.login + '/sign-in', credentials);
};