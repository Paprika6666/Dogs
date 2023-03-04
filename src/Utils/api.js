const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'content-type': 'application/json',
      Authorization: 
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZhMTUwNzRlZTQxOTk3NWZiZDI5MGUiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc3MzMzODYzLCJleHAiOjE3MDg4Njk4NjN9.oyQVTHGfQWwZ7KRTQyv7AZa12NsOEaDv7WruuYRFA5Y'  
    },
};

const onResponce = (res) => {
    return res.ok ? res.json(): Promise.reject ('Error');
};

class Api {
    // { baseUrl, headers }
    constructor (data) {
        this._baseUrl = data.baseUrl;
        this._headers = data.headers;
    }
    getProductList (page=1) {
        return fetch(`${this._baseUrl}/products?page=${page}`, {
        headers: this._headers,
    }).then((res) => onResponce(res));
}

getProductById (id) {
    return fetch(`${this._baseUrl}/products${id}`, {
    headers: this._headers,
}).then((res) => onResponce(res));
}

addProduct (data) {
    return fetch(`${this._baseUrl}/products`, {
    headers: this._headers,
    method: 'POST',
    body: JSON.stringify (data)
}).then((res) => onResponce(res));
}
getUserInfo () {
    return fetch(`${this._baseUrl}/users/me`, {
    headers: this._headers,
}).then((res) => onResponce(res));
}
searchProducts (query){
    return fetch(`${this._baseUrl}/products/search?query=${query}`, {
        headers: this._headers,
    }).then((res) => onResponce(res));
}
// like - true/false
// changeLikeProductstatus(productId, like) {
//     return fetch(`${this._baseUrl}/products/likes/${productId}`, {
//         headers: this._headers,
//         method: like ? 'PUT' :'DELETE'
//     }).then((res) => onResponce(res));   
// }

deleteLike(productId) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
        headers: this._headers,
        method: 'DELETE' 
    }).then((res) => onResponce(res));  

}

addLike(productId) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
        headers: this._headers,
        method: 'PUT' 
    }).then((res) => onResponce(res));  

}
}

export const api = new Api(config);

// api.getProductList();

export const getProductList = () => {
    return fetch (`${config.baseUrl}/products`, {
        headers: config.headers,
        }).then ((res) => onResponce(res));
}

export const getUserInfo = () => {
    return fetch (`${config.baseUrl}/users/me`, {
        headers: config.headers,
        }).then ((res) => onResponce(res));
}

export const searchProducts = (query) => {
    return fetch (`${config.baseUrl}/products/search?query=${query}`, {
        headers: config.headers,
        }).then ((res) => onResponce(res));
}

// export const func = () => {
//     return fetch().then(onResponce)
// }
