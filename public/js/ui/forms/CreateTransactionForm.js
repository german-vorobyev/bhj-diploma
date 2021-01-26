// const { response } = require("express");

/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let expense_accounts_list = this.element.querySelector(".accounts-select");
    Account.list({}, (err,response) => {
      if (err == null && response.success) {
        expense_accounts_list.innerHTML = "";
        response.data.forEach(item => {
          let option = document.createElement("option");
          option.value = item.id;
          option.innerHTML = item.name;
          expense_accounts_list.appendChild(option);
        });
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options, (err, response) => {
      if (err == null && response.success) {
        this.element.reset();
        let modalCreateTransactionIncome = App.getModal("newIncome");
        modalCreateTransactionIncome.close();
        let modalCreateTransactionExpense = App.getModal("newExpense");
        modalCreateTransactionExpense.close();
        App.update();
      }
    });
  }
}
