import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  return (
    <div className='modal is-active' onClick={props.onClick}>
      <div className='modal-background'></div>
      <div className='modal-card' onClick={e => e.stopPropagation()}>
        <header className='modal-card-head'>
          <p className='modal-card-title'>{props.title}</p>
          <button
            className='delete'
            aria-label='close'
            onClick={props.onClick}></button>
        </header>
        <section className='modal-card-body'>
          <img width='500px' src={props.src} alt={props.alt} />
          <p>{props.description}</p>
        </section>
        <footer className='modal-card-foot'>
          <button onClick={props.onClick} className='button'>
            Quit
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
