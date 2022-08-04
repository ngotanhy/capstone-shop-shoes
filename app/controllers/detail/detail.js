import Product from '../../models/Product.js';
import { Cart } from '../../models/Cart.js'
let cart = new Cart();


window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('productId');
    getByIDProduct(myParam);
    cart.getProductLocalStorage();
    document.querySelector('#numberItem').innerHTML = `(${cart.totalCount()})`;
}

let product = new Product();

//get by id product
let getByIDProduct = (id) => {
    let promises = axios({
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
        method: 'GET',
        responseType: 'JSON'
    })

    promises.then((res) => {
        let prodById = res.data.content;
        product = { ...prodById };
        renderView(product);
        renderRelatedProducts(product);
    })

    promises.catch((err) => {
        console.log(err.response.data);
    })

}
//render view detail
let renderView = (product) => {
    let img = document.querySelector(".productImg");
    let name = document.querySelector("#nameItem");
    let description = document.querySelector("#descriptionItem");
    let sizeItem = document.querySelector("#sizeItem");
    let price = document.querySelector("#priceItem");

    img.innerHTML = `<img src="${product.image}"alt="" >`;
    name.innerHTML = product.name;
    description.innerHTML = product.description;
    let htmlSize = '';
    for (let size of product.size) {
        htmlSize += `
    <div class="swapper-prodSize">
        <button class="size " onclick=(addActive('${size}'))>${size}</button>
    </div>
    `
    }
    sizeItem.innerHTML = htmlSize;
    price.innerHTML = product.price + '$';
}

//increase the number of products
document.querySelector("#upItem").onclick = () => {
    let toggle = document.querySelector('.toggle');
    let count = document.querySelector("#countItem");
    let currentCount = Number(count.innerHTML);
    let quantity = product.quantity;
    if (currentCount > quantity) {
        toggle.innerHTML = `<p class="bg-danger">Sản phẩm ${product.name} đã hết </p>`;
        toggle.style.opacity = 1;
        setTimeout(() => {
            toggle.style.opacity = 0;
        }, 2000)
    } else {
        currentCount += 1;
    }
    count.innerHTML = currentCount;

}

//reduce the number of products
document.querySelector("#downItem").onclick = () => {
    let count = document.querySelector("#countItem");
    let currentCount = Number(count.innerHTML);
    if (currentCount <= 1) {
        currentCount;
        console.log("invalid")
    } else {
        currentCount -= 1;
    }
    count.innerHTML = currentCount;
}

//render relatedProduct
let renderRelatedProducts = (product) => {
    let relatedProducts = product.relatedProducts;
    let htmlRelatedProducts = '';
    for (let prod of relatedProducts) {
        htmlRelatedProducts += `
            <div class="prodCard col-4">
                <div class="card">
                    <img src="${prod.image}" alt="">
                    <h2 class="name">${prod.name}</h2>
                    <p class="shortDes ">
                        ${prod.shortDescription}
                    </p>
                    <div class="cardFooter">
                        <button class="buyProd" onclick=(buyNow('${prod.id}'))>
                            Buy now
                        </button>
                        <p class="priceItem">
                            ${prod.price}$
                        </p>
                    </div>
                </div>
            </div>
       `
    }
    document.querySelector("#relateProduct").innerHTML = htmlRelatedProducts;
}

//display the view mode 
window.buyNow = (id) => {
    getByIDProduct(id);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//add class active
window.addActive = (size) => {
    let arrSize = document.querySelectorAll('.swapper-prodSize .size');
    for (let sizeItem of arrSize) {
        if (Number(size) == Number(sizeItem.innerHTML)) {
            sizeItem.classList.add("activeSize")
        } else {
            sizeItem.classList.remove("activeSize");
        }
    }
}

//onclick button add to Cart
document.querySelector('#btnAddToCart').onclick = () => {
    let toggle = document.querySelector('.toggle');
    let size = document.querySelector('.swapper-prodSize .activeSize');
    if (size == undefined) {
        toggle.innerHTML = `<p class="bg-danger">Hãy chon size cho sản phẩm ${product.name}</p>`;
        toggle.style.opacity = 1;
        setTimeout(() => {
            toggle.style.opacity = 0;
        }, 2000)
    } else {
        size = size.innerHTML;
        let img = document.querySelector('.productImg img').src;
        let name = document.querySelector("#nameItem").innerHTML;
        let price = document.querySelector("#priceItem").innerHTML;
        let countItem = Number(document.querySelector('#countItem').innerHTML);
        let id = product.id;
        price = Number(price.replace('$', ''));
        let prod = {
            id,
            img,
            name,
            size,
            countItem,
            price,
            totalPrice: function () {
                return this.price * this.countItem;
            }
        }
        cart.arrProducts.push(prod);
        toggle.style.opacity = 1;
        toggle.innerHTML = `<p class="bg-success">Thêm sản phẩm ${prod.name} thành công</p>`;
        setTimeout(() => {
            toggle.style.opacity = 0;
        }, 1000)
        document.querySelector('#numberItem').innerHTML = `(${cart.totalCount()})`;
    }
    cart.checkSimilarProductInList();
    cart.saveProductLocalStorage();

}

//Show product information on cart
document.querySelector('#displayBtnCart').onclick = () => {
    document.querySelector('#numberItem').innerHTML = `(${cart.totalCount()})`;
    renderModal();
    cart.saveProductLocalStorage();
}


//render the modal
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