import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import AppContext from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

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
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <Footer />
      </AppContext.Provider>
    </div>
  );
}

export default App
