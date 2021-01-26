// const { response } = require("express");

/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    console.log(options);
    User.register(options, (err, response) => {
      console.log(err, response);
      if (err == null && response.success) {
        App.setState('user-logged');
        let modal_register = App.getModal("register");
        modal_register.close();
      }
    });
  }
}
