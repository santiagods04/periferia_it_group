import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const Home = () => {
  const { posts } = useContext(AppContext);

  return (
    <div className="home">
      <h1 className="home__title">Publicaciones</h1>

      <div className="home__container">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article className="home__card" key={post.id}>
              <h2 className="home__card-title">Publicación</h2>

              <p className="home__card-message">
                {post.message}
              </p>

              <hr className="home__card-divider" />

              <footer className="home__card-footer">
                <span className="home__card-author">
                  Escrito por: {post.owner?.email || 'Usuario anónimo'}
                </span>
                <time className="home__card-date">
                  {new Date(post.createdAt).toLocaleDateString()}
                </time>
              </footer>
            </article>
          ))
        ) : (
          <p className="home__empty">No hay publicaciones disponibles en este momento.</p>
        )}
      </div>
    </div>
  );
};

export default Home;