
//modal button down 
export let modalDown = (id, count, size) => {
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
export let modalUp = (id, count, size) => {

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
export let deleteProd = (id, size) => {
    let index = cart.arrProducts.findIndex(item => item.id == id && item.size == size);
    cart.arrProducts.splice(index, 1);
    renderModal();
    cart.saveProductLocalStorage();
    document.querySelector('#numberItem').innerHTML = `(${cart.totalCount()})`;
}

