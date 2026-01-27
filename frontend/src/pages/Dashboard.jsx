import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

const Dashboard = () => {
  const { handleAddPost } = useContext(AppContext);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      handleAddPost(message);
      setMessage('');
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Panel de Control</h1>
      
      <section className="dashboard__container">
        <h2 className="dashboard__form-title">Crear publicación</h2>
        
        <form className="dashboard__form" onSubmit={handleSubmit}>
          <textarea
            className="dashboard__textarea"
            placeholder="¿Qué estás pensando?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button className="dashboard__button" type="submit">
            Publicar
          </button>
        </form>
      </section>
    </div>
  );
};

export default Dashboard;