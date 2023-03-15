import api from "../../http";


export const setCourtsList = (list) => ({
type: 'COURTS::CHANGE_LIST',
payload: list
})
export const setCourtTypes = list => ({
    type: 'COURTS::CHANGE_TYPES',
    payload: list
})
export const setCourtLevels = list => ({
    type: 'COURTS::CHANGE_LEVELS',
    payload: list
})
// export const setCurrentContract = contract => ({
//     type: 'CONTRACTS::GET_CURRENT',
//     payload: contract
// })


export const findCourtsByName = (string) => async dispatch => {
    let result;
    try{
    result = await api.get('/courts/findByName?find=' + string);
    
    }
    catch(e){
        throw new Error(e.message);
    }
    if(result) dispatch(setCourtsList(result.data));
}

export const recieveCourtTypes = () => async dispatch => {
    try{
        const {data} = await api.get('courts/getTypes');
        dispatch(setCourtTypes(data));
    }
    catch(e){
        throw new Error(e.message);
    }
}

export const recieveCourtLevels = () => async dispatch => {
    try{
        const {data} = await api.get('courts/getLevels');
        dispatch(setCourtLevels(data));
    }
    catch(e){
        throw new Error(e.message);
    }
}
export const createCourt = (court, address) => async () => {
    court.house = address.house;
    court.flat = address.flat;
    court.block = address.block;
    try{
        const {data} = await api.post('courts/create', {
            court, address
        });
        return data;
    }
    catch(e){
        throw new Error(e.message);
    }
}