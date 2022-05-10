import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { debtorsReducer } from './debtors/reducer';
import { contractsSlice } from './contracts/reducer';
import { cessionsReducer } from './cessions/reducer';
import { organizationsSlice } from './organizations/reducer';
import { alertReducer } from './alert/reducer';
import { globalReducer } from './global';
import { paymentsSlice } from './contracts/payments/reducer';
import { courtsReducer } from './courts/reducer';
import  { actionsSlice } from './actions/reducer';
import usersSlice from './users/reducer';
import { tasksReducer } from './tasks/reducer';
import agentsSlice from './agents/reducer';
import { bailiffsSlice } from './bailiffs/reducer';

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
    cessions: cessionsReducer,
    debtors: debtorsReducer,
    global: globalReducer,
    actions: actionsSlice.reducer,
    users: usersSlice.reducer,
    tasks: tasksReducer,
    agents: agentsSlice.reducer,
    contracts: contractsSlice.reducer,
    bailiffs: bailiffsSlice.reducer,
})

export const setupStore = () => configureStore({
    reducer: rootReducer
})

// export const store = setupStore();