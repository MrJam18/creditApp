import api from '../../http'



export const setTasksList = (list, total) => ({
    type: 'TASKS::SET_LIST',
    payload: {
        list, total
    }
})


export const recieveTaskstList = (limit, page, sort, userId) => async dispatch => {
    try{
        const {data} = await api.get(`/tasks/getList?userId=${userId}&limit=${limit}&page=${page}&sort=${sort}`);
        dispatch(setTasksList(data.rows, data.count));
    }
    catch(e){
         throw new Error(e.message)
    }
}
// export const setOrganizationsLoading = (data) => ({
//     type: 'ORGANIZATIONS::SET_LOADING',
//     payload: data
// })


// export const findOrganizations = (val, setError) => async (dispatch) => {
//     try{
//     setOrganizationsLoading(true);
//     const {data} = await api.get('organizations/getNameList?value=' + val);
//     dispatch(setOrganizationsNames(data));
//     setOrganizationsLoading(false);
//     }
//     catch(e) {
//         setError(e.message)
//     }

// }

