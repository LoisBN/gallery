import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  return (
    <div id='myModal' class='picture-modal' onClick={props.onClick}>
      <div className='section'>
        <div className='container'>
          <div class='modal-picture-body' onClick={e => e.stopPropagation()}>
            <span class='close' onClick={props.onClick}>
              &times;
            </span>

            <img width='500px' src={props.src} alt={props.alt} />
            <p className='modal-desc'>{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
