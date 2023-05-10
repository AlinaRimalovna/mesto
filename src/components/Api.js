export class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers
  }
  _checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
   
    // res.ok ?  res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
    .then(this._checkResponse);
      // .then(res => {
      //   if (res.ok) {
      //     return res.json();
      //   }
      //   return Promise.reject(`Ошибка: ${res.status}`);
      // });
  }
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then(this._checkResponse);
    // .then(res => {
    //   if (res.ok) {
    //     return res.json();
    //   }
    //   return Promise.reject(`Ошибка: ${res.status}`);
    // });
  }

  changeUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about })
    })
    .then(this._checkResponse);
      // .then(res => {
      //   if (res.ok) {
      //     return res.json();
      //   }
      //   return Promise.reject(`Ошибка: ${res.status}`);
      // });
  }
  addNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
    .then(this._checkResponse);
      // .then(res => {
      //   if (res.ok) {
      //     return res.json();
      //   }
      //   return Promise.reject(`Ошибка: ${res.status}`);
      // });
  }
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._checkResponse);
      // .then(res => {
      //   if (res.ok) {
      //     return res.json();
      //   }
      //   return Promise.reject(`Ошибка: ${res.status}`);
      // });
  }
  likeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(this._checkResponse);
      // .then(res => {
      //   if (res.ok) {
      //     return res.json();
      //   }
      //   return Promise.reject(`Ошибка: ${res.status}`);
      // });
  }
  deleteLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._checkResponse);
      // .then(res => {
      //   if (res.ok) {
      //     return res.json();
      //   }
      //   return Promise.reject(`Ошибка: ${res.status}`);
      // });
  }
  changeAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar })
    })
    .then(this._checkResponse);
      // .then(res => {
      //   if (res.ok) {
      //     return res.json();
      //   }
      //   return Promise.reject(`Ошибка: ${res.status}`);
      // });
  }
}