import { productsList } from "./mainStructuresForProducts";
import { updateCartUI } from "./updateUI";

//* Getting product info from ls
export function getProductsLocalStorage(){
    let productsLocalStoraged;

    if(localStorage.getItem('products') === null){
        productsLocalStoraged = [];
    } else {
        productsLocalStoraged = JSON.parse(localStorage.getItem('products'));
    };
    return productsLocalStoraged;
};

export function saveProductsLocalStorage(productInfo){
    let products;
    products = getProductsLocalStorage(); 
    products.push(productInfo);
    localStorage.setItem('products', JSON.stringify(products));
};

export function readLocalStorage(){
    let productsLocalStoraged;
    productsLocalStoraged = getProductsLocalStorage();
    if(productsLocalStoraged.length >= 1){
        productsLocalStoraged.forEach(function(productInfo){
            const row = document.createElement('div');
            row.classList.add('my-2')
            row.innerHTML = `
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 border-top border-bottom">
                <div class="d-flex flex-row flex-wrap justify-content-between align-items-stretch p-2">
                    <div class="col-xs-1 col-sm-1 col-md-2 col-lg-2 mx-0 py-0 d-flex justify-content-start align-items-start">
                        <button class="material-symbols-sharp deleteProduct p-2 rounded" data-id="${productInfo.id}">delete</button>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-5 mx-0 py-2 position-relative">
                        <img class="img-fluid w-50 position-relative top-50 start-50 translate-middle rounded" src="${productInfo.image}" alt="producto" loading="lazy">
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-5 mx-0 py-2">
                        <h5 class="card-title">${productInfo.productName}</h5>
                        <ul class="list-unstyled d-flex flex-column justify-content-between align-items-start my-2 p-1">
                            <li>${productInfo.currency}</li>
                            <li>${productInfo.hashRate}</li>
                            <li>${productInfo.algorithm}</li>
                            <li>${productInfo.power}</li>
                        </ul>
                        <p class="fs-5 mt-2">${productInfo.price} ${productInfo.pricing}</p>
                    </div>
                </div>
            </div>
            `
            productsList.appendChild(row);
        });
    };
};

export function deleteProductLocalStoraged(productId){
    let productsLocalStoraged;
    productsLocalStoraged = getProductsLocalStorage();

    productsLocalStoraged.forEach(function(product, index){
        if(product.id === productId){
            productsLocalStoraged.splice(index, 1);
        };
    });
    localStorage.setItem('products', JSON.stringify(productsLocalStoraged));

    if(productsLocalStoraged.length === 0){
        updateCartUI(); // Should be placed here?
    }
};

export function clearLocalStorage(){
    window.localStorage.removeItem('products');
};