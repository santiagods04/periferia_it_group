import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Panel de Control</h1>

      <section className="dashboard__container">
        <h2 className="dashboard__form-title">Crear publicación</h2>
        
        <form className="dashboard__form">
          <textarea 
            className="dashboard__textarea" 
            placeholder="¿Qué estás pensando?"
            required
          ></textarea>

          <button className="dashboard__button" type="submit">
            Publicar
          </button>
        </form>
      </section>
    </div>
  );
};

export default Dashboard;