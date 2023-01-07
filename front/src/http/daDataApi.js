import axios from "axios";
import {serverApi} from "../utils/serverApi";
import {daDataApiPath} from "../constants/pathes/daDataApiPath";
import {daDataToken} from "../constants/daDataToken";

export const daDataApi = axios.create({
    baseURL: daDataApiPath,
    timeout: 5000,
    timeoutErrorMessage: 'Истекло время на ответ сервера адресов.',
    headers: {
        'Content-Type':  'application/json',
        'Accept':        'application/json',
        'Authorization': 'Token ' + daDataToken,
    },
});

daDataApi.interceptors.response.use((conf) => conf, (err) => {
    console.dir(err);
    throw err;
    }
)


