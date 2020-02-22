import React, { useState } from 'react';
import { signin } from '../../actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

const Signup = props => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = e => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'username':
        setUsername(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;

      default:
        throw new Error('wtf');
    }
    console.log(props);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formValues = { username, password };
    props.signin(formValues);
  };
  return (
    <section class='hero is-fullheight'>
      <div class='hero-body'>
        <div class='container'>
          <div class='columns is-centered'>
            <div class='column is-5-tablet is-4-desktop is-3-widescreen'>
              <form onSubmit={handleSubmit} action='' class='box'>
                <div class='field'>
                  <label for='' class='label'>
                    Username
                  </label>
                  <div class='control has-icons-left'>
                    <input
                      value={username}
                      name='username'
                      onChange={handleChange}
                      type='text'
                      placeholder='username'
                      class='input'
                      required
                    />
                    <span class='icon is-small is-left'>
                      <i class='fas fa-user-circle'></i>
                    </span>
                  </div>
                </div>
                <div class='field'>
                  <label for='' class='label'>
                    Password
                  </label>
                  <div class='control has-icons-left'>
                    <input
                      name='password'
                      value={password}
                      onChange={handleChange}
                      type='password'
                      placeholder='password'
                      class='input'
                      required
                    />
                    <span class='icon is-small is-left'>
                      <i class='fa fa-lock'></i>
                    </span>
                  </div>
                </div>
                <div class='field'>
                  <button class='button is-success'>Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default connect(null, { signin })(Signup);
