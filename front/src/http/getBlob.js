// import axios from "axios";
// import { serverApi } from "../utils/serverApi";

// export const apiDownload = axios.create({
//     withCredentials: true,
//     baseURL: serverApi,
//     timeout: 10000,
//     timeoutErrorMessage: 'Истекло время на ответ сервера.',
//     method: 'GET',
//     responseType: 'blob',
// })

// apiDownload.interceptors.request.use((conf)=> {
//     conf.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
//     return conf;
// })
// apiDownload.interceptors.response.use((conf) => conf, async (err) => {
//     const origReq = err.config;
//     if (err.response.status == 401 && err.config && !err.config._isRetry) {
//         origReq._isRetry = true;
//         try{
//             const res = await axios.get((`${serverApi}users/refresh`, {withCredentials: true}));
//             localStorage.setItem('token', res.data.accessToken);
//             return api.request(origReq);
//         }
//         catch(e){
//             throw new Error(401, 'Ошибка авторизации!');

//         }
//     }
//     throw err;
// })


// export const saveFile = async (path, fileName) => {
//     const {data} = apiDownload.get(path, {responseType})
//     const blob = new Blob([response.data])
// }


// // export const saveFileFromServer = async (path, fileName) => {
// //     try{
// //         const response = await fetch(path)
// //         if(response.status === 200 ){
// //             const blob = await response.blob();
// //             saveAs(blob, fileName);
// //         }
// //         else throw new Error(response.message)
// //     }
// //     catch(e){
// //         console.log(e);
// //         throw new Error(e.message);
// //     }
// //     }