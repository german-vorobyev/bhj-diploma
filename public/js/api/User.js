// const { response } = require("express");

/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static get URL() {
    return "/user";
  }
  static setCurrent(user) {
    let json = JSON.stringify(user);
    localStorage.setItem("user", json);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem("user");
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.getItem("user"));
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    let fetchCallback = (err, response) => {
      if (err == null && response.success) {
        User.setCurrent(response.user);
      }
      else if (err == null) {
        User.unsetCurrent();
      }
      callback(err, response);
    }
    return createRequest({url: User.URL+"/current", method: "GET", data: data, callback: fetchCallback, responseType: "json"});
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    let loginCallback = (err, response) => {
      if (err == null && response.success) {
        User.setCurrent(response.user);
      }
      callback(err, response);
    }
    return createRequest({url: User.URL+"/login", method: "POST", data: data, callback: loginCallback, responseType: "json"});
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    let registerCallback = (err, response) => {
      if (err == null && response.success) {
        User.setCurrent(response.user);
      }
      callback(err, response);
    }
    return createRequest({url: User.URL+"/register", method: "POST", data: data, callback: registerCallback, responseType: "json"});
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    let logoutCallback = (err, response) => {
      if (err == null && response.success) {
        User.unsetCurrent();
      }
      callback(err, response);
    }
    return createRequest({url: User.URL+"/logout", method: "POST", data: data, callback: logoutCallback, responseType: "json"});
  }
}
