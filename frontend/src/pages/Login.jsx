import React from 'react';

const Login = () => {
  return (
    <div className="login">
      <section className="login__container">
        <h1 className="login__title">Iniciar Sesión</h1>
        
        <form className="login__form">
          <div className="login__group">
            <label className="login__label" htmlFor="email">Email</label>
            <input 
              className="login__input" 
              type="email" 
              id="email" 
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