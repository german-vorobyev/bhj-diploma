// const { response } = require("express");

/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element == null) {
      throw new Error("this element null");
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    let create_account = document.querySelector(".create-account");
    let accounts = document.querySelectorAll(".account");
    create_account.addEventListener("click", () => {
      let modalCreateAccount = App.getModal("createAccount");
      modalCreateAccount.open();
    });
    accounts.forEach((item) => {
      item.addEventListener("click", () => {
        this.onSelectAccount(item);
      });
      item.querySelector("a").onclick = () => {return false}
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    let currentUser = User.current();
    if (!currentUser)
      return;
    Account.list(currentUser, (err, response) => {
      this.clear();
      if (err == null && response.success) {
        this.renderItem(response.data);
      }
    });
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    let listAccounts = this.element.querySelectorAll(".account");
    listAccounts.forEach((item) => {
      this.element.removeChild(item);
    });
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    let accountActive = this.element.querySelector(".active");
    if (accountActive) {
      accountActive.classList.remove("active");
    }
    element.classList.add("active");
    let id = element.getAttribute("data-id");
    App.showPage( 'transactions', { account_id: id});
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
    let li = document.createElement("li");
    li.classList.add("account");
    li.setAttribute("data-id", item.id);
    let a = document.createElement("a");
    a.href = "#";
    a.onclick = () => {return false;}
    let span_name = document.createElement("span");
    let span_balance = document.createElement("span");
    span_name.innerHTML = item.name;
    span_balance.innerHTML = item.sum;
    li.appendChild(a);
    a.appendChild(span_name);
    a.appendChild(document.createTextNode(" / "));
    a.appendChild(span_balance);
    a.appendChild(document.createTextNode(" ₽"));
    li.onclick = () => this.onSelectAccount(li);
    return li;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {
    item.forEach((temp) => {
      this.element.appendChild(this.getAccountHTML(temp));
    });
  }
}