const freshToken = () => {
    return { headers: {
        'content-type': 'application/json',
        Authorization: 
        localStorage.getItem ('token'),
      },
    };
  };

const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'content-type': 'application/json',
      Authorization: 
      localStorage.getItem ('token'),
    },
    freshToken:freshToken
};

const onResponce = (res) => {
    return res.ok ? res.json(): Promise.reject ('Error');
};

class Api {
    // { baseUrl, headers }
    constructor (data) {
        this._baseUrl = data.baseUrl;
        this._headers = data.headers;
        this.freshToken = data.freshToken;
    }
    getProductList (limit=300) {
        return fetch(`${this._baseUrl}/products?limit=${limit}`, {
       ...this.freshToken(),
    }).then((res) => onResponce(res));
}

getProductById (id) {
    // console.log (id);
    return fetch(`${this._baseUrl}/products/${id}`, {
        ...this.freshToken(),
}).then((res) => onResponce(res));
}

deleteProductById (id) {
    // console.log (id);
    return fetch(`${this._baseUrl}/products/${id}`, {
        ...this.freshToken(),
    method: 'DELETE',
}).then((res) => onResponce(res));
}

addProduct () {
    return fetch(`${this._baseUrl}/products`, {
        ...this.freshToken(),
    method: 'POST',
    body: JSON.stringify ({
        "name": "СТУЛ С ПОДЛОКОТНИКАМИ HUNT",
        "price": 9900,
        "discount": 4,
        "wight": "9-12 шт.",
        "description": "Дизайнерский стул «Hunt» c отделочной строчкой в виде ромба и острыми подлокотниками выглядит стильно и эффектно.",
        "available": true,
        "stock": 19,
        "pictures": "https://i.yapx.ru/V48Hz.jpg"

    }),
}).then((res) => onResponce(res));
}
getUserInfo () {
    return fetch(`${this._baseUrl}/users/me`, {
        ...this.freshToken(),
}).then((res) => onResponce(res));
}

getUsers () {
    return fetch(`${this._baseUrl}/users`, {
        ...this.freshToken(),
}).then((res) => onResponce(res));
}

//  registerUser(data){
//     return fetch(`${this._baseUrl}/signup`, {
//       headers: this._headers,
//       method: 'POST',
//       body: JSON.stringify(data),
//     }).then((res) => onResponce(res));
//   }

searchProducts (query){
    return fetch(`${this._baseUrl}/products/search?query=${query}`, {
        ...this.freshToken(),
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
        ...this.freshToken(),
        method: 'DELETE' 
    }).then((res) => onResponce(res));  

}

addLike(productId) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
        ...this.freshToken(),
        method: 'PUT' 
    }).then((res) => onResponce(res));  
}

addReview (productId, body) {
return fetch(`${this._baseUrl}/products/review/${productId}`, {
    ...this.freshToken(),
    method: 'POST',
    body: JSON.stringify(body)
}).then((res) => onResponce(res));  
}
deleteReview (productId, reviewId) {
    return fetch(`${this._baseUrl}/products/reviews/${productId}/${reviewId}`, {
        ...this.freshToken(),
        method: 'DELETE' 
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
