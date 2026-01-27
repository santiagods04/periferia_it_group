import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

const Login = () => {
  const { handleLogin } = useContext(AppContext); 
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(form.email, form.password)
      .then(() => {
        navigate('/dashboard');
      })
      .catch((err) => {
        alert("Credenciales incorrectas " + err);
      });
  };

  return (
    <div className="login">
      <section className="login__container">
        <h1 className="login__title">Iniciar Sesión</h1>

        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__group">
            <label className="login__label" htmlFor="email">Email</label>
            <input
              className="login__input"
              type="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className="login__group">
            <label className="login__label" htmlFor="password">Contraseña</label>
            <input
              className="login__input"
              type="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Tu contraseña"
              required
            />
          </div>

          <button className="login__button" type="submit">
            Entrar
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;