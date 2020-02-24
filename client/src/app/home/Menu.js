import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { autologin } from '../../actions';

const Menu = props => {
  useEffect(() => {
    props.autologin(localStorage.getItem('access_token'));
  }, []);
  return (
    <div className='section container to-left has-background-light home-menu'>
      <aside class='container menu container'>
        <p class='menu-label'>General</p>
        <ul class='menu-list'>
          <li className='home-menu-item'>
            <Link to='/'>Dashboard</Link>
          </li>
          <li>
            <Link to='/upload'>Upload</Link>
          </li>
        </ul>
        <p class='menu-label'>Administration</p>
        <ul class='menu-list'>
          <li>
            <Link to='/search'>Search</Link>
          </li>
          <li>
            <Link to='/'>Manage Your Team</Link>
            <ul>
              <li>
                <Link to='/'>Members</Link>
              </li>
              <li>
                <Link to='/'>Plugins</Link>
              </li>
              <li>
                <Link to='/'>Add a member</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to='/'>Invitations</Link>
          </li>
          <li>
            <Link to='/'>Cloud Storage Environment Settings</Link>
          </li>
          <li>
            <Link to='/'>Authentication</Link>
          </li>
        </ul>
        <p class='menu-label'>Transactions</p>
        <ul class='menu-list'>
          <li>
            <Link to='/'>Payments</Link>
          </li>
          <li>
            <Link to='/'>Transfers</Link>
          </li>
          <li>
            <Link to='/'>Balance</Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default connect(null, { autologin })(Menu);
