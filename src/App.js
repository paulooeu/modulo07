import React from 'react';
import { Router } from 'react-router-dom';
import Routes from './routes';
import './config/ReactotronConfig';
import GlobalStyle from './styles/global';
import Header from './Components/Header';
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from 'react-toastify';
import history from './services/history';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <GlobalStyle />
        <Header />
        <ToastContainer autoClose={3000} />
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
