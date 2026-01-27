import React from 'react';

const Home = () => {
  const publicacion = {
    titulo: "Nueva actualización de React",
    mensaje: "Estamos explorando cómo la arquitectura BEM mejora la lectura de nuestros componentes en proyectos grandes.",
    autor: "Carlos Ruiz",
    fecha: "26 de enero, 2026"
  };

  return (
    <div className="home">
      <h1 className="home__title">Publicaciones</h1>

      <article className="home__card">
        <h2 className="home__card-title">{publicacion.titulo}</h2>
        
        <p className="home__card-message">
          {publicacion.mensaje}
        </p>

        <hr className="home__card-divider" />

        <footer className="home__card-footer">
          <span className="home__card-author">Escrito por: {publicacion.autor}</span>
          <time className="home__card-date">{publicacion.fecha}</time>
        </footer>
      </article>
    </div>
  );
};

export default Home;