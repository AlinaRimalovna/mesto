export class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);

  }
  getUserInfo() {


    return {
      userName: this._name.textContent,
      userAbout: this._about.textContent
    }

  }
  setUserInfo({ userName, userAbout }) {

    this._name.textContent = userName;
    this._about.textContent = userAbout;

  }
}