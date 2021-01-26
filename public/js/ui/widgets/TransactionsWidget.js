/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    let create_income_button = document.querySelector(".create-income-button");
    let create_expense_button = document.querySelector(".create-expense-button");
    create_income_button.addEventListener("click", () => {
      let newIncome = App.getModal("newIncome");
      newIncome.open();
    });
    create_expense_button.addEventListener("click", () => {
      let newExpense = App.getModal("newExpense");
      newExpense.open();
    });
  }
}
