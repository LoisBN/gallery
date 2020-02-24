import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  return (
    <div class='modal is-active' onClick={props.onClick}>
      <div class='modal-background'></div>
      <div class='modal-card' onClick={e => e.stopPropagation()}>
        <header class='modal-card-head'>
          <p class='modal-card-title'>{props.title}</p>
          <button
            class='delete'
            aria-label='close'
            onClick={props.onClick}></button>
        </header>
        <section class='modal-card-body'>
          <img width='500px' src={props.src} alt={props.alt} />
          <p>{props.description}</p>
        </section>
        <footer class='modal-card-foot'>
          <button onClick={props.onClick} class='button'>
            Quit
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
