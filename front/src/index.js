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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
