import React from 'react';
import Menu from './home/Menu';
import Tabs from './home/Tabs';
import Main from './home/Main';
import { BrowserRouter, Route } from 'react-router-dom';
import Signup from './signup/Signup';
import Upload from './uploadPage/Upload';
import Login from './login/Login';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <>
          <Tabs />
          <Route path='/' exact>
            <Menu />
            <Main />
          </Route>
          <Route path='/signup' exact component={Signup} />
          <Route path='/login' exact component={Login} />
          <Route path='/upload' exact component={Upload} />
        </>
      </BrowserRouter>
    </div>
  );
};

export default App;
