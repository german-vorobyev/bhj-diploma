// const { response } = require("express");

/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    let sidebar_toggle = document.querySelector(".sidebar-toggle");
    sidebar_toggle.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-open");
      document.body.classList.toggle("sidebar-collapse");
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    let menu_item_login = document.querySelector(".menu-item_login");
    let menu_item_register = document.querySelector(".menu-item_register");
    let menu_item_logout = document.querySelector(".menu-item_logout");
    let modal_register = App.getModal("register");
    let modal_login = App.getModal("login");
    menu_item_login.addEventListener("click", () => {
      modal_login.open();
    });
    menu_item_register.addEventListener("click", () => {
      modal_register.open();
    });
    menu_item_logout.addEventListener("click", () => {
      User.logout({}, (err,response) => {
        if (err == null && response.success) {
          App.setState("init");
        }
      });
    });
  }

}
