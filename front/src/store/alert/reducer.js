const initState = false;
    
    
    
    
    
    
    export const alertReducer = (state = initState, action) => {
        switch(action.type) {
            case 'ALERT::CHANGE':
                return action.payload;
            case 'ALERT::HIDE':
                return false;
            default:
                return state;
        }
    }