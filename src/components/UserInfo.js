export class UserInfo {
constructor({ nameSelector, aboutSelector, avatarSelector }) {
  this._name = document.querySelector(nameSelector);
  this._about = document.querySelector(aboutSelector);
  this._avatar = document.querySelector(avatarSelector);

  }
  getUserInfo() {
    return {
      userName: this._name.textContent,
      userAbout: this._about.textContent,
      userAvatar: this._avatar.src
    }

  }
  setUserInfo({ userName, userAbout, userAvatar }) {
    this._name.textContent = userName;
    this._about.textContent = userAbout;
    this._avatar.src = userAvatar;
    }
}
