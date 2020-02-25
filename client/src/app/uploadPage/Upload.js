import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

const Upload = props => {
  const [fileName, setFileName] = useState('No file uploaded');
  const inputFile = useRef(null);
  console.log(props);
  return (
    <section class='hero is-fullheight'>
      <div class='hero-body'>
        <div class='container'>
          <div class='columns is-centered'>
            <div class='column is-5-tablet is-5-desktop is-5-widescreen'>
              <form
                action='/api/upload'
                encType='multipart/form-data'
                method='POST'
                class='box'>
                <div class='field'>
                  <label for='' class='label'>
                    title
                  </label>
                  <div class='control has-icons-left'>
                    <input
                      name='title'
                      type='text'
                      placeholder='title'
                      class='input'
                      required
                    />
                    <span class='icon is-small is-left'>
                      <i class='fa fa-envelope'></i>
                    </span>
                  </div>
                </div>
                <div class='field'>
                  <label for='' class='label'>
                    description
                  </label>
                  <div class='control has-icons-left'>
                    <textarea
                      required
                      placeholder='write a description'
                      name='description'
                      className='textarea'
                    />
                  </div>
                </div>
                <div id='file-js-example' class='file has-name'>
                  <label class='file-label'>
                    <input
                      required
                      ref={inputFile}
                      type='file'
                      className='file-input'
                      name='file'
                      multiple
                      onChange={e => setFileName(e.target.value)}
                    />
                    <span class='file-cta'>
                      <span class='file-icon'>
                        <i class='fas fa-upload'></i>
                      </span>
                      <span class='file-label'>Choose a file…</span>
                    </span>
                    <span class='file-name'>{fileName}</span>
                  </label>
                </div>
                <input
                  readOnly
                  required
                  style={{ display: 'none' }}
                  name='access_token'
                  value={props.authState.username}></input>
                <br />
                <div class='field'>
                  <button class='button is-success'>Upload</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  authState: state.auth
});

export default connect(mapStateToProps)(Upload);
