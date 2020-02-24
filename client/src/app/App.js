import React from 'react';
import Menu from './home/Menu';
import Tabs from './home/Tabs';
import Main from './home/Main';
import history from '../history/history';
import { Router, Route } from 'react-router-dom';
import Signup from './signup/Signup';
import Upload from './uploadPage/Upload';
import Login from './login/Login';
import ProfileSeeker from './profiles/ProfileSeeker';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <>
          <Tabs />
          <Route path='/' exact>
            <Menu />
            <Main />
          </Route>
          <Route path='/signup' exact component={Signup} />
          <Route path='/login' exact component={Login} />
          <Route path='/upload' exact component={Upload} />
          <Route path='/search' exact component={ProfileSeeker} />
        </>
      </Router>
    </div>
  );
};

export default App;
