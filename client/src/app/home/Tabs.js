import React, { useEffect, useState } from 'react';
import Logo from '../../assets/pictures/batman.png';
import { connect } from 'react-redux';
import { logout, autologin } from '../../actions';
import { Link } from 'react-router-dom';

const Tabs = props => {
  const renderButtons = param => {
    return param ? (
      <button onClick={props.logout} className='button'>
        <strong>Log out from {props.authState.username}</strong>
      </button>
    ) : (
      <>
        <Link to='/signup' className='button'>
          <strong>Sign up</strong>
        </Link>
        <Link to='/login' className='button is-light'>
          Log in
        </Link>
      </>
    );
  };

  return (
    <>
      <nav
        className='navbar home-navbar has-shadow'
        role='navigation'
        aria-label='main navigation'>
        <div className='navbar-brand '>
          <Link className='navbar-item' to='/'>
            <img src={Logo} />
          </Link>

          <Link
            role='button'
            to='/'
            className='navbar-burger burger'
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarBasicExample'>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </Link>
        </div>

        <div id='navbarBasicExample' className='navbar-menu'>
          <div className='navbar-start'>
            <Link className='navbar-item '>Home</Link>

            <Link className='navbar-item'>Documentation</Link>

            <div className='navbar-item has-dropdown is-hoverable'>
              <Link className='navbar-link'>More</Link>

              <div className='navbar-dropdown'>
                <Link className='navbar-item'>About</Link>
                <Link className='navbar-item'>Jobs</Link>
                <Link className='navbar-item'>Contact</Link>
                <hr className='navbar-divider' />
                <Link className='navbar-item'>Report an issue</Link>
              </div>
            </div>
          </div>

          <div className='navbar-end'>
            <div className='navbar-item'>
              <div className='buttons'>
                {renderButtons(props.authState.authenticated)}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = state => ({
  authState: state.auth
});

export default connect(mapStateToProps, { logout, autologin })(Tabs);
