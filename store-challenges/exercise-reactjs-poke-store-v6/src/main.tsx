import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import App from './App.tsx';
import store from './redux/store.ts';
import client from './api/apolloClient.ts';

// LA LÍNEA MÁS IMPORTANTE PARA LOS ESTILOS:
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </ReduxProvider>
  </React.StrictMode>
);