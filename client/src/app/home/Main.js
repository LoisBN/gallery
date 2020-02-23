import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { autologin } from '../../actions';
import Picture from './Picture';

const Main = ({ autologin, authState }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const error = {};
  const [currentPage, setCurrentPage] = useState(1);
  //const [maxPerPage, setMaxPerPage] = useState(12);
  const maxPerPage = 24;
  const [baseIndex, setBaseIndex] = useState(null);

  const lastPage = Math.ceil(posts.length / maxPerPage);

  const pagePost = posts.slice(baseIndex, baseIndex + 24);

  useEffect(() => {
    setBaseIndex(currentPage * maxPerPage - 24);
  }, [currentPage]);

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      const res = await axios.post(
        'http://192.168.42.201:5000/expose',
        authState
      );
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, [authState]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    autologin(token);
    console.log(token);
  }, []);

  const nextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
      setBaseIndex(currentPage === 1 ? 0 : currentPage - 1 * maxPerPage);
      return;
    }
    error.pagination = 'No next page';
  };

  const previouspage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      console.log(baseIndex);
      return;
    }
    error.pagination = 'No previous page';
  };

  return (
    <>
      <div className='home-main'>
        <div className='container'>
          {loading ? (
            <div class='section'>
              <div class='container'>
                <div class='columns'>
                  <div class='column is-6 is-offset-3'>
                    <div class='box'>
                      <div class='loader-wrapper'>
                        <div class='loader is-loading'></div>
                      </div>
                      <h2 class='title is-2'>
                        We are actually fetching your pictures please wait a sec
                        😊
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='columns is-multiline is-mobile'>
              {pagePost.map(post => {
                console.log(post.title);
                return (
                  <div key={post.name} class='column is-mobile is-one-quarter'>
                    <Picture
                      src={post.file}
                      title={post.title}
                      owner={post.owner}
                      message={post.description}
                    />
                  </div>
                );
              })}
            </div>
          )}
          {pagePost.length == 0 && (
            <>
              <br />
              <div className='title container'>No picture for you</div>
            </>
          )}
        </div>
        <div className='section'>
          <div className='container'>
            <nav class='pagination' role='navigation' aria-label='pagination'>
              <p class='pagination-previous' onClick={previouspage}>
                Previous
              </p>
              <p class='pagination-next' onClick={nextPage}>
                Next page
              </p>
              <ul class='pagination-list'>
                <li>
                  <p
                    onClick={() => setCurrentPage(1)}
                    class={
                      currentPage === 1
                        ? 'pagination-link is-current'
                        : 'pagination-link'
                    }
                    aria-label='Goto page 1'>
                    1
                  </p>
                </li>
                {currentPage > 1 && (
                  <li>
                    <span class='pagination-ellipsis'>&hellip;</span>
                  </li>
                )}
                {currentPage > 2 && (
                  <li>
                    <p
                      class='pagination-link'
                      onClick={() => setCurrentPage(currentPage - 1)}
                      aria-label='Goto page 1'>
                      {' '}
                      {currentPage - 1}
                    </p>
                  </li>
                )}
                {currentPage > 3 && (
                  <li>
                    <p
                      class='pagination-link'
                      onClick={() => setCurrentPage(currentPage - 2)}
                      aria-label='Goto page 1'>
                      {' '}
                      {currentPage - 2}
                    </p>
                  </li>
                )}
                {currentPage > 4 && (
                  <li>
                    <p
                      class='pagination-link'
                      onClick={() => setCurrentPage(currentPage - 3)}
                      aria-label='Goto page 1'>
                      {' '}
                      {currentPage - 3}
                    </p>
                  </li>
                )}
                {currentPage > 1 && currentPage < lastPage && (
                  <li>
                    <p
                      class='pagination-link is-current'
                      aria-label='Goto page 1'>
                      {currentPage}
                    </p>
                  </li>
                )}
                {currentPage < lastPage - 1 && (
                  <li>
                    <p
                      class='pagination-link'
                      onClick={() => setCurrentPage(currentPage + 1)}
                      aria-label='Goto page 1'>
                      {' '}
                      {currentPage + 1}
                    </p>
                  </li>
                )}
                {currentPage < lastPage - 2 && (
                  <li>
                    <p
                      class='pagination-link'
                      onClick={() => setCurrentPage(currentPage + 2)}
                      aria-label='Goto page 1'>
                      {' '}
                      {currentPage + 2}
                    </p>
                  </li>
                )}
                {currentPage < lastPage - 3 && (
                  <li>
                    <p
                      class='pagination-link'
                      onClick={() => setCurrentPage(currentPage + 3)}
                      aria-label='Goto page 1'>
                      {' '}
                      {currentPage + 3}
                    </p>
                  </li>
                )}
                {currentPage < lastPage && (
                  <li>
                    <span class='pagination-ellipsis'>&hellip;</span>
                  </li>
                )}
                {lastPage !== 1 && (
                  <li>
                    <p
                      class={
                        currentPage === lastPage
                          ? 'pagination-link is-current'
                          : 'pagination-link'
                      }
                      onClick={() => setCurrentPage(lastPage)}
                      aria-label='Goto page 86'>
                      {lastPage}
                    </p>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  authState: state.auth
});

export default connect(mapStateToProps, { autologin })(Main);
