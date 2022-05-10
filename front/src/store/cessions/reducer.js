const initState = {
    loading: true,
    list: []
}
    
    
    
    
    
    
    export const cessionsReducer = (state = initState, action) => {
        switch(action.type) {
            case 'CESSIONS::CHANGE':
                return {
                    ...state,
                    list: action.payload
                }
            case 'CESSIONS::SET_LOADING':
                return {
                    ...state,
                    loading: action.payload
                }
            default:
                return state;
        }
    }