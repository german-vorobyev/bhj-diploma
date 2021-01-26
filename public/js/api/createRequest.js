// const x = require("uniqid");

/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let xhr = new XMLHttpRequest();
    let url =  options.url;
    if (options.method == "GET") {
        let urlEncodedDataPairs = [];
        for (let key in options.data) {
            urlEncodedDataPairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(options.data[key]));
        }
        urlEncodedData = urlEncodedDataPairs.join('&');
        url +="?"+ urlEncodedData;
    }
    xhr.open(options.method, url);
    xhr.responseType = options.responseType;
    xhr.onload = () => {
        if (xhr.status != 200) {
            options.callback({status: xhr.status,statusText: xhr.statusText});
        }
        else {
            options.callback(null, xhr.response);
        }
    }
    xhr.onerror = () => {
        options.callback({status: xhr.status,statusText: xhr.statusText});
    }
    if (options.headers) {
        for(let key in options.headers) {
            xhr.setRequestHeader(key, options.headers[key]);
        }
    }
    if (options.data) {
        let formData = new FormData();
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
        xhr.send(formData);
    }
    else {
        xhr.send();
    }
    return xhr;
};
