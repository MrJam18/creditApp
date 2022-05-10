
const initState = {
    search: {
        Republic: 'UR',
    city: 'Izhevsk',
    street: 'Petrova',
    house: '33',
    apart: '132'
    },
    debtors:{
        1: {
            Republic: 'UR',
        city: 'Izhevsk',
        street: 'Petrova',
        house: '33',
        apart: '132'
        },
        2: {
            Republic: 'UR',
        city: 'Izhevsk',
        street: 'Petrova',
        house: '33',
        apart: '132'
        },
        3: {
            Republic: 'UR',
        city: 'Izhevsk',
        street: 'Petrova',
        house: '33',
        apart: '132'
        }
}
}



export const AdressReducer = (state = initState, dispatch) => {
    switch(dispatch.action) {
        case 'ADRESSES::CHANGE_DEBTORS': 
        return ({
            ...state,
            debtors: dispatch.payload
        });
        case 'ADRESSES::CHANGE_SEARCH':
            return ({
                ...state,
                search: action.payload
            })
        default:
            return state
    }
}