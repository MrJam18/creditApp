import axios from 'axios';
import { serverApi } from '../utils/serverApi';
import { saveAs } from 'file-saver';

const api = axios.create({
    withCredentials: true,
    baseURL: serverApi,
    timeout: 5000,
    timeoutErrorMessage: 'Истекло время на ответ сервера.'
})

api.interceptors.request.use((conf)=> {
    conf.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return conf;
})
api.interceptors.response.use((conf) => conf, async (err) => {
    const origReq = err.config;
    if (err.response.status == 401 && err.config && !err.config._isRetry) {
        origReq._isRetry = true;
        try{
            const res = await axios.get(`${serverApi}users/refresh`, {withCredentials: true});
            localStorage.setItem('token', res.data.accessToken);
            return api.request(origReq);
        }
        catch(e){
            throw new Error(401, 'Ошибка авторизации!');

        }
    }
    throw err;
})


export const saveFile =  async (path, fileName) => {
    const {data} = await api.get(path, {responseType: 'blob'});
    const blob = new Blob([data]);
    saveAs(blob, fileName);
    return {status: 'ok'}
}
export const saveFilePost = async (path, body, fileName) => {
    const {data} = await api.post(path, body, {responseType: 'blob'});
    const blob = new Blob([data]);
    saveAs(blob, fileName);
    return {status: 'ok'}
}

export default api;