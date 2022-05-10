import api from '../../http';

export const setCessions = (data) => ({
    type: 'CESSIONS::CHANGE',
    payload: data
})
export const setCessionsLoading = (data) => ({
    type: 'CESSIONS::SET_LOADING',
    payload: data
})


export const findCessions = (val, setError) => async (dispatch) => {
    try{
    setCessionsLoading(true);
    const {data} = await api.get('cessions/getNameList?value='+ val);
    dispatch(setCessions(data));
    setCessionsLoading(false);
    }
    catch(e) {
        setError(e.message)
    }

}