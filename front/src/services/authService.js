import api from "../http";

export default class AuthService {
    static async login(email, password){
       return await api.post('users/login', { email, password });
    }
    static async logout(){
        return await api.post('users/logout');
    }
}