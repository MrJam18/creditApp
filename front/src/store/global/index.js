import { setAlert } from "../alert/actions"

const initState = {
    loading: true,
    modal: false,
    error: false,
    openLeftMenu: false
}


export const globalReducer = (state = initState, action) => {
    switch(action.type) {
        case 'GLOBAL::CHANGE_LOADING':
            return {
                ...state,
                loading: action.payload
            }
        case 'GLOBAL::CHANGE_MODAL':
            return {
                ...state, 
                modal: action.payload
            }
        case 'GLOBAL::CHANGE_ERROR': 
            return {
                ...state,
                error: action.payload
            }
        case 'GLOBAL::SET_OPEN_LEFT_MENU':
            return {
                ...state,
                openLeftMenu: action.payload
            }
        default:
            return state;
    }
}

/**
 *
 * @param {boolean} state состояние загрузки.
 * @return {object} экшен для редьюсера
 */
export const setloading = (state = true) => ({
    type: 'GLOBAL::CHANGE_LOADING',
    payload: state
})
export const setModal = (state) => ({
    type: 'GLOBAL::CHANGE_MODAL',
    payload: state
})
export const setGlobalError = (message) => ({
    type: 'GLOBAL::CHANGE_ERROR',
    payload: message
})
export const setOpenLeftMenu = (bool) => ({
    type: 'GLOBAL::SET_OPEN_LEFT_MENU',
    payload: bool
})

export const errorWithAlert = (errorAction, error) => dispatch => {
    dispatch(setAlert('Ошибка', error.message, 'error'));
    dispatch(errorAction(error.message));
}


export const getLoading = state => state.global.loading;
export const getModal = state => state.global.modal;
export const getGlobalError = state => state.global.error;
export const getOpenLeftMenu = state => state.global.openLeftMenu;