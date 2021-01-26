/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get URL () {
    return "";
  }
  static list( data, callback = f => f ) {
    return createRequest({url: this.URL, method: "GET", data: data, callback: callback, responseType: "json"});
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    let copy = Object.assign({}, data);
    copy._method = "PUT";
    return createRequest({url: this.URL, method: "POST", data: copy, callback: callback, responseType: "json"});
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    let copy = Object.assign({}, data);
    copy.id = id;
    return createRequest({url: this.URL+"/"+id, method: "GET", data: copy, callback: callback, responseType: "json"});
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    let copy = Object.assign({}, data);
    copy._method = "DELETE";
    copy.id = id;
    return createRequest({url: this.URL, method: "POST", data: copy, callback: callback, responseType: "json"});
  }
}

