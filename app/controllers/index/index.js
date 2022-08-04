import { Cart } from '../../models/Cart.js'
let cart = new Cart();


//get all products
let getAllProducts = () => {
    let promises = axios({
        url: 'https://shop.cyberlearn.vn/api/Product',
        method: 'GET',
        responseType: 'JSON'
    })
    promises.then((res) => {
        let products = res.data.content;
        renderCarousel(products);
        renderProducts(products);
    })
    promises.catch((err) => {
        console.log(err.response.data);
    })
}

//render products
let renderProducts = (products) => {
    let htmlProducts = '';
    for (let prod of products) {
        htmlProducts += `
            <div class="prodCard col-4">
                <div class="card">
                    <img src="${prod.image}" alt="">
                        <h2 class="name">${prod.name}</h2>
                        <p class="shortDes text-truncate">${prod.shortDescription}</p>
                    <div class="cardFooter">
                        <a href="./app/views/detail.html?productId=${prod.id}">
                            <button class="buyProd" onclick=(buyNow('${prod.id}'))>
                                Buy now
                            </button>
                        </a>
                        <p class="priceItem">
                            ${prod.price}$
                        </p>
                    </div>
                </div>
            </div>
       `
    }
    document.querySelector("#relateProduct").innerHTML = htmlProducts;

}

//render carousel

let renderCarousel = (products) => {
    let htmlContent = '';
    for (let i = 0; i < 3; i++) {
        htmlContent += `
                    <div class="carousel-item ${ i == 0 ? 'active' : ''}">
                    <div class="inner d-flex align-items-center">
                            <div class="carousel-item-left col-8">
                                <img class="d-block w-100" src=${products[i].image} alt="First slide">
                            </div>
                            <div class="carousel-item-right col-4 ">
                                <h3 class="name">${products[i].name}</h3>
                                <p class="desc">${products[i].shortDescription}</p>
                                <a href="./app/views/detail.html?productId=${products[i].id}">
                                    <button class="buyNow" onclick=(buyNow('${products[i].id}'))>
                                        Buy now
                                     </button>
                                </a>    
                            </div>
                     </div>
                    </div>
                 `
    }
    document.querySelector('.carousel-inner').innerHTML = htmlContent;
}


window.onload = function () {
    getAllProducts();
    cart.getProductLocalStorage();
    document.querySelector('#numberItem').innerHTML = `(${cart.totalCount()})`;
}