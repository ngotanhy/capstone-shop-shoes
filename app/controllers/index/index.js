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

let renderModal = () => {
    let htmlContent = '';
    for (let prod of cart.arrProducts) {
        prod = {
            ...prod, totalPrice: function () {
                return prod.price * prod.countItem;
            }
        }
        htmlContent += `
            <div class="col-3">
                <img src="${prod.img}"/>   
            </div>
            <div class="col-6">
                <div class="name">${prod.name}</div>
                <div class="sizeItem">size: ${prod.size}</div>
                <div class="countItem">Số lượng: ${prod.countItem}</div>
                <div class="price">Giá tiền 1 sản phẩm: ${prod.price}$</div>
                <div class="totalPrice">Tông tiền: ${prod.totalPrice()}$</div>
                <div class="row pl-3">
                   <button type="button" class="col-1" onclick=(modalDown('${prod.id}','${prod.countItem}','${prod.size}'))>-</button>                   
                   <span class="col-1" id="modalCount">${prod.countItem}</span>
                   <button type="button" class="col-1"  onclick=(modalUp('${prod.id}','${prod.countItem}','${prod.size}'))>+</button>
                </div>
            </div>
            <div class="col-1">
                    <button type="button" class="btn btn-danger" onclick=(deleteProd('${prod.id}','${prod.size}'))>Delete</button>                   
            </div>
         `
    }
    document.querySelector('#tableProduct').innerHTML = `${htmlContent}
        <div class="total">Tổng giá:<span > ${cart.total()}$</span><div>
    `;
}

//modal button down 
window.modalDown = (id, count, size) => {
    if (count > 1) {
        count -= 1;
        for (let prod of cart.arrProducts) {
            if (prod.id == id && prod.size == size) {
                prod.countItem = count;
                renderModal()
                break;
            }
        }
    }
    cart.saveProductLocalStorage();
    document.querySelector('#numberItem').innerHTML = `(${cart.totalCount()})`;
}

//modal button up
window.modalUp = (id, count, size) => {

    if (count <= product.quantity) {
        count = Number(count) + 1;
        for (let prod of cart.arrProducts) {
            if (prod.id == id && prod.size == size) {
                prod.countItem = count;
                renderModal()
                break;
            }
        }
    } else {
        document.querySelector('.countItem').innerHTML = 'Sold out'
    }
    cart.saveProductLocalStorage();
    document.querySelector('#numberItem').innerHTML = `(${cart.totalCount()})`;

}

//delete product
window.deleteProd = (id, size) => {
    let index = cart.arrProducts.findIndex(item => item.id == id && item.size == size);
    cart.arrProducts.splice(index, 1);
    renderModal();
    cart.saveProductLocalStorage();
    document.querySelector('#numberItem').innerHTML = `(${cart.totalCount()})`;
}

//delete All Products in cart.arrProducts
document.querySelector('#deleteAll').onclick = () => {
    cart.arrProducts = [];
    cart.saveProductLocalStorage();
    document.querySelector('#numberItem').innerHTML = `(${cart.totalCount()})`;
}

window.onload = function () {
    getAllProducts();
    cart.getProductLocalStorage();
    renderModal();
    document.querySelector('#numberItem').innerHTML = `(${cart.totalCount()})`;
}
