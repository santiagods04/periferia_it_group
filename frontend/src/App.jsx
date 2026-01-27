import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppContext from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import auth from './utils/auth';
import api from './utils/api';
import { setToken, removeToken, getToken } from './utils/token';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    api.getInitialPosts()
      .then(setPosts)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const jwt = getToken();
    if (jwt) {
      api.getCurrentUser()
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => removeToken());
    }
  }, []);

  const handleLogin = (email, password) => {
    return auth.login(email, password)
      .then((res) => {
        if (res.token) {
          setToken(res.token);
          setIsLoggedIn(true);
          return api.getCurrentUser();
        }
      })
      .then(setCurrentUser)
  };

  const handleAddPost = (message) => {
    api.createPost(message)
      .then((newPost) => {
        setPosts([newPost, ...posts]); 
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const contextValue = {
    currentUser,
    posts,
    isLoggedIn,
    handleLogin,
    handleLogout,
    handleAddPost,
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
