import { getToken } from './token';

class Api {
  constructor(url) {
    this._url = url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialPosts() {
    return fetch(`${this._url}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  getCurrentUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`, 
      },
    }).then(this._checkResponse);
  }

  createPost(message) {
    return fetch(`${this._url}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ message }),
    }).then(this._checkResponse);
  }
}

const api = new Api(import.meta.env.VITE_API_URL || 'http://localhost:3000');

export default api;