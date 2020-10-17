import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Routes from '../_Routes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Routes />
      </Switch>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
