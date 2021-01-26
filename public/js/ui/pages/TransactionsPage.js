// const { response } = require("express");

/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (element == null) {
      throw new Error("this element is null");
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    if (!this.lastOptions) {
      this.render();
    }
    else {
      this.render(this.lastOptions);
    }
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    let remove_account = document.querySelectorAll(".remove-account");
    remove_account.forEach((item) => {
      item.addEventListener("click", () => {
        this.removeAccount();
      });
    });
    let transaction__remove = document.querySelectorAll(".transaction__remove");
    transaction__remove.forEach((item) => {
      item.addEventListener("click", (event) => {
        //let target = event.target;
        let id = item.getAttribute("data-id");
        this.removeTransaction(id);
      });
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if (!this.lastOptions) {return;}
    let deleted = confirm("Вы действительно хотите удалить счёт?");
    if (!deleted) {return;}
    Account.remove(this.lastOptions.account_id, this.lastOptions, (err, response) => {
      if (err == null && response.success) {
        App.update();
      }
    });
    this.lastOptions = null;
    this.clear();
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    let deleted = confirm("Вы действительно хотите удалить транзакцию?");
    if (!deleted) {return;}
    Transaction.remove(id, {}, (err, response) => {
      if (err == null && response.success) {
        App.update();
      }
    });
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    if (!options) {return;}
    this.lastOptions = options;
    Account.get(options.account_id, options, (err, response) => {
      if (err == null && response.success) {
        this.renderTitle(response.data.name);
      }
    });
    Transaction.list(options, (err, response) => {
      if (err == null && response.success) {
        this.renderTransactions(response.data);
      }
    });
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle("Название счёта");
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    let content_title = document.querySelector(".content-title");
    content_title.innerHTML = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
    let d = date;
    let ye = new Intl.DateTimeFormat('ru', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('ru', { month: 'long' }).format(d);
    let da = new Intl.DateTimeFormat('ru', { day: 'numeric' }).format(d);
    let ho = new Intl.DateTimeFormat('ru', { hour: '2-digit' }).format(d);
    let mi = new Intl.DateTimeFormat('ru', { minute: '2-digit' }).format(d);
    return `${da} ${mo} ${ye} г. в  ${ho}:${mi}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    return `<div class="transaction transaction_${item.type} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <div class="transaction__date">${this.formatDate(item.date)}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      ${item.sum}
           <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>`
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    let content = this.element.querySelector(".content");
    content.innerHTML = '';
    data.forEach((item) => {
      content.innerHTML+= this.getTransactionHTML(item);
    });
    this.registerEvents();
  }
}
