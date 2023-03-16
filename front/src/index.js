import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Router from './components/Router';
import { setupStore } from './store';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

export const store = setupStore();
export const dispatch = store.dispatch;
export const getStoreState = store.getState();

ReactDOM.render(
  
  <React.StrictMode>
    <BrowserRouter>
    <Provider store ={store}>
      <StyledEngineProvider injectFirst>
    <Router />
    </StyledEngineProvider>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
