// const { response } = require("express");

/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit( options ) {
    Account.create(options, (err, response) => {
      if (err == null && response.success) {
        let modalCreateAccount = App.getModal("createAccount");
        modalCreateAccount.close();
        App.update();
      }
    });
  }
}
