import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // localStorage
import { debtorsReducer } from './list/debtors/reducer';
import { contractsReducer } from './list/contracts/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const persistConfig = {
//     key: 'creditApp',
//     storage,
//   }
const rootReducer = combineReducers({
    debtors: debtorsReducer,
    contracts: contractsReducer
})
// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
// export const persistor = persistStore(store);
