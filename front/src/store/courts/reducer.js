const initState = {
    list: [],
    types: [],
    levels: []
    
}

export const courtsReducer = (state = initState, action) => {
    switch(action.type) {
        case 'COURTS::CHANGE_LIST':
            return {
                ...state,
                list: action.payload
            }
        case 'COURTS::CHANGE_TYPES':
            return {
                ...state,
                types: action.payload
            }
        case 'COURTS::CHANGE_LEVELS':
            return {
                ...state,
                levels: action.payload
            }
        case 'COURTS::CLEAR_LIST':
            return {
                ...state,
                list: []
            }
        default:
            return state
    }
}