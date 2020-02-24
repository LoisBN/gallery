import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

const Picture = props => {
  const [modalActive, setModalActive] = useState(false);
  const [description, setDescription] = useState('no description available');
  console.log(props);
  return (
    <>
      {modalActive &&
        ReactDOM.createPortal(
          <Modal
            src={'http://192.168.42.201:5000/public/posts/' + props.src}
            description={props.message}
            title={props.title}
            onClick={() => setModalActive(false)}
          />,
          document.querySelector('#modal')
        )}
      <div class='card display-card-mobile'>
        <div
          class='card-image'
          onClick={e => {
            console.log(e.target.src);
            setDescription(e.target.alt);
            setModalActive(true);
          }}>
          <figure class='image is-4by3'>
            <img
              src={'http://192.168.42.201:5000/public/posts/' + props.src}
              alt='Placeholder image'
            />
          </figure>
        </div>
        <div class='card-content own-card-content'>
          <div class='media'>
            <div class='media-left'></div>
            <div class='media-content'>
              <p>{props.title}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Picture;
