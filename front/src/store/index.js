import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { debtorsSlice } from './debtors/reducer';
import { contractsSlice } from './contracts/reducer';
import {cessionsSlice} from './cessions/reducer';
import { organizationsSlice } from './creditors/reducer';
import { alertReducer } from './alert/reducer';
import { globalReducer } from './global';
import { paymentsSlice } from './contracts/payments/reducer';
import { courtsReducer } from './courts/reducer';
import  { actionsSlice } from './actions/reducer';
import usersSlice from './users/reducer';
import { tasksReducer } from './tasks/reducer';
import agentsSlice from './agents/reducer';
import { bailiffsSlice } from './bailiffs/reducer';
import { listSlice } from './list/reducer';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const persistConfig = {
//     key: 'creditApp',
//     storage,
//   }
const rootReducer = combineReducers({
    courts: courtsReducer,
    payments: paymentsSlice.reducer,
    alert: alertReducer,
    organizations: organizationsSlice.reducer,
    cessions: cessionsSlice.reducer,
    debtors: debtorsSlice.reducer,
    global: globalReducer,
    actions: actionsSlice.reducer,
    users: usersSlice.reducer,
    tasks: tasksReducer,
    agents: agentsSlice.reducer,
    contracts: contractsSlice.reducer,
    bailiffs: bailiffsSlice.reducer,
    list: listSlice.reducer
})

export const setupStore = () => configureStore({
    reducer: rootReducer
})

// export const store = setupStore();