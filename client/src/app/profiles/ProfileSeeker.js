import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { search } from '../../actions';

const ProfileSeeker = props => {
  const [section, setSection] = useState('all');
  const [current, setCurrent] = useState('');
  const [filter, setFilter] = useState('');
  let counter = 0;

  useEffect(() => {
    props.search(section);
  }, [section, props.authState.authenticated]);
  const handleChange = e => {
    setFilter(e.target.value);
  };
  const displayModal = current => {
    if (current !== '') {
      return (
        <div class='modal is-active' onClick={() => setCurrent('')}>
          <div class='modal-background'></div>
          <div class='modal-card'>
            <header class='modal-card-head'>
              <p class='modal-card-title'>Profile</p>
              <button
                class='delete'
                aria-label='close'
                onClick={() => setCurrent('')}></button>
            </header>
            <section class='modal-card-body'>
              <p className='subtitle'>Profile info :</p>
              <div>
                username : {current.username} <br />
                email : {current.email} <br />
              </div>
            </section>
            <footer class='modal-card-foot'>
              <button class='button is-success' onClick={() => setCurrent('')}>
                Save changes
              </button>
              <button class='button' onClick={() => setCurrent('')}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      );
    }
  };
  return (
    <div className='section'>
      <div className='container'>
        <nav class='panel is-link'>
          <p class='panel-heading' onChange={handleChange}>
            You can search anything from here
          </p>
          <div class='panel-block'>
            <p class='control has-icons-left'>
              <input
                class='input'
                type='text'
                onChange={handleChange}
                placeholder='Search'
              />
              <span class='icon is-left'>
                <i class='fas fa-search' aria-hidden='true'></i>
              </span>
            </p>
          </div>
          <p class='panel-tabs'>
            <a
              className={section === 'all' ? 'is-active' : 'none'}
              onClick={() => setSection('all')}>
              All
            </a>
            <a
              className={section === 'friends' ? 'is-active' : 'none'}
              onClick={() => setSection('friends')}>
              Friends
            </a>
            <a
              className={section === 'private' ? 'is-active' : 'none'}
              onClick={() => setSection('private')}>
              Private
            </a>
            <a
              className={section === 'team' ? 'is-active' : 'none'}
              onClick={() => setSection('team')}>
              Team
            </a>
            <a
              className={section === 'albums' ? 'is-active' : 'none'}
              onClick={() => setSection('albums')}>
              Albums
            </a>
          </p>
          {typeof props.searchState == typeof [] &&
          props.searchState.length > 0 ? (
            props.searchState.map((user, index) => {
              if (user.username.includes(filter)) {
                counter += 1;
                return (
                  <a
                    key={index}
                    onClick={() => {
                      setCurrent(user);
                    }}
                    class={
                      current.username === user.username
                        ? 'panel-block is-active'
                        : 'panel-block'
                    }>
                    <span class='panel-icon'>
                      <i class='fas fa-user' aria-hidden='true'></i>
                    </span>
                    {user.username}
                  </a>
                );
              }
            })
          ) : (
            <div className='panel-block'>can't find you anything</div>
          )}
          {counter === 0 && (
            <div className='panel-block'>No occurences with your research</div>
          )}
          <div class='panel-block'>
            <button class='button is-link is-outlined is-fullwidth'>
              Reset all filters
            </button>
          </div>
        </nav>
      </div>
      {displayModal(current)}
    </div>
  );
};

const mapStateToProps = state => ({
  authState: state.auth,
  searchState: state.search
});

export default connect(mapStateToProps, { search })(ProfileSeeker);
