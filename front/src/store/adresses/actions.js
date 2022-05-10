import { socket } from "../../utils/webSockets";

// export const sendForDBMatches = (array) => () => {
//     let adressObj = {
//         fragments: {
//             region: 'удмуртская республика'
//         }
//     };
//     if (/^[а-я]{2,3}$/.test(array[0]) || /[а-я]{10,}/.test(array[0])) {
//         adressObj.fragments.region = array[0] + '%'
//         array.shift();
//     }
//     // else {
//     //     adressObj.republic = 'не определено';
//     // }

//     adressObj = {
//         event: 'ADRESSES::GET_MATCHES',
//         fragments: {
//         region: adressObj.fragments.region,
//         city: array[0] + '%',
//         street: array[1] + '%',
//         house: array[2] + '%',
//         aparts: array[3] + '%',
//         }
//     }
//     socket.send(JSON.stringify(adressObj))

//     // array.forEach(el => {
//     //     console.log( /^[а-я]{1,5}\.$/.test(el))
//     // })


// }