class Auth {
    constructor(url) {
        this._url = url;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    login(email, password) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(this._checkResponse);
    }

}

const auth = new Auth(import.meta.env.VITE_API_URL);

export default auth;