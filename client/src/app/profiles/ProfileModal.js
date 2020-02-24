import React from 'react';

const ProfileModal = () => {
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
};

export default ProfileModal;
