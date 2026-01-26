import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import AppContext from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0)


  const contextValue = {
    count,
    setCount
  };
  return (
    <div className="container">
      <AppContext.Provider value={contextValue}>
        <Header />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<h1>Inicio</h1>} />
            <Route path="/login" element={<h1>Iniciar Sesión</h1>} />
            <Route path="/dashboard" element={<h1>Acerca de</h1>} />
          </Routes>
        </main>

        <Footer />
      </AppContext.Provider>
    </div>
  );
}

export default App
