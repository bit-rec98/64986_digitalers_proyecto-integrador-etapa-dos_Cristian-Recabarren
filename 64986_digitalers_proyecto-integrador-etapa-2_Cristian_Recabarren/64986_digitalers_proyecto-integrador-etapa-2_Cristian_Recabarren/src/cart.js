import Swal from "sweetalert2";
import { structure } from "./interface";
import { isUserLoggedIn } from "./getUserInfo";

const errorToast = Swal.mixin({
    toast: true,
    position: "bottom-left",
    iconColor: "#222222",
    color: "#222222",
    background: "#e63946",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});

const successToast = Swal.mixin({
    toast: true,
    position: "bottom-left",
    iconColor: "#222222",
    color: "#222222",
    background: "#f85e00",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});

disableAddBtns()
function disableAddBtns(){
    const addProductsBtns = document.querySelectorAll('.cardBody > .btnClass')
    if(Boolean(isUserLoggedIn.connectSession) === false){
        for(let i = 0; i < addProductsBtns.length; i++){
            addProductsBtns[i].classList.add('disabled')
        }
    };
};

const productsList = document.querySelector('#productsListing');
const cartProductsResume = document.querySelector('#cartProductsProcessingList');
const priceResume = document.querySelector('#pricesResume');

export function addProduct(e){
    e.preventDefault();
    if(e.target.classList.contains('btnClass')){ //Btn to add products
        const product = e.target.parentElement.parentElement;
        readProductInfo(product);
    };
};

export function addGpuProduct(e){
    e.preventDefault();
    if(e.target.classList.contains('btnClass')){
        const gpuProduct = e.target.parentElement.parentElement.parentElement;
        readGpuInfo(gpuProduct);
    };
};

function readProductInfo(product){
    const productInfo = {
        image: product.querySelector('img').src,
        productName:product.querySelector('h5').textContent,
        currency: product.querySelector('.currency').textContent,
        hashRate: product.querySelector('.hashrate').textContent,
        algorithm: product.querySelector('.algorithm').textContent,
        price: product.querySelector('.productPrice').textContent,
        pricing: product.querySelector('.productPricing').textContent,
        power: product.querySelector('.power').textContent,
        id: product.querySelector('button').getAttribute('data-id'),
        amount: 1,
        type: 'ASIC'
    };
    let productsLocalStoraged;
    productsLocalStoraged = getProductsLocalStorage();
    productsLocalStoraged.forEach(function(product){
        if(product.id === productInfo.id){
            productsLocalStoraged = product.id;
        };
    });
    if(productsLocalStoraged === productInfo.id){
        errorToast.fire({
            icon: 'error',
            title: '¡El producto ya se agregó al carro!'
        })
    } else {
        addToCart(productInfo);
    };
};

function readGpuInfo(gpuProduct){
    const gpuProductInfo = {
        image: gpuProduct.querySelector('img').src,
        productName: gpuProduct.querySelector('h5').textContent,
        currency: gpuProduct.querySelector('.currency').textContent,
        hashRate: gpuProduct.querySelector('.hashrate').textContent,
        algorithm: gpuProduct.querySelector('.algorithm').textContent,
        price: gpuProduct.querySelector('.productPrice').textContent,
        pricing: gpuProduct.querySelector('.productPricing').textContent,
        power: gpuProduct.querySelector('.power').textContent,
        id: gpuProduct.querySelector('button').getAttribute('data-id'),
        amount: 1,
        type: 'GPU'
    }
    let productsLocalStoraged;
    productsLocalStoraged = getProductsLocalStorage();
    productsLocalStoraged.forEach(function(gpuProduct){
        if(gpuProduct.id === gpuProductInfo.id){
            productsLocalStoraged = gpuProduct.id;
        };
    });
    if(productsLocalStoraged === gpuProductInfo.id){
        errorToast.fire({
            icon: 'error',
            title: '¡El producto ya se agregó al carro!'
        });
    }
    else {
        addToCart(gpuProductInfo);
    };
};

//* Getting product info from ls
function getProductsLocalStorage(){
    let productsLocalStoraged;

    if(localStorage.getItem('products') === null){
        productsLocalStoraged = [];
    } else {
        productsLocalStoraged = JSON.parse(localStorage.getItem('products'));
    };
    return productsLocalStoraged;
};

function addToCart(productInfo){
    let productType = productInfo;
    
    if(isUserLoggedIn === false){
        errorToast.fire({
            icon: 'error',
            title: '¡Es necesario registrarse o iniciar sesión para conseguir nuestros productos!'
        });
    } else {
        if(productType.type === 'ASIC'){
            const row = document.createElement('div');
            row.classList.add('my-2')
            row.innerHTML = `
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 border-top border-bottom">
                <div class="d-flex flex-row flex-wrap justify-content-between align-items-stretch p-2">
                    <div class="col-xs-1 col-sm-1 col-md-2 col-lg-2 mx-0 py-0 d-flex flex-xs-row flex-sm-row flex-md-column flex-lg-column justify-content-start align-items-start">
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
                        <p class="fs-5 mt-2">${Number(productInfo.price)} ${productInfo.pricing}</p>
                    </div>
                </div>
            </div>
            `;
            productsList.appendChild(row);
            saveProductsLocalStorage(productInfo);
            successToast.fire({
                icon: 'success',
                title: '¡El producto fue agregado correctamente!'
            });
        } else if (productType.type === 'GPU') {
            const row = document.createElement('div');
            row.classList.add('my-2')
            row.innerHTML = `
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 border-top border-bottom">
                <div class="d-flex flex-row flex-wrap justify-content-between align-items-stretch p-2">
                    <div class="col-xs-1 col-sm-1 col-md-2 col-lg-2 mx-0 py-0 d-flex flex-xs-row flex-sm-row flex-md-column flex-lg-column justify-content-start align-items-start">
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
            `;
            productsList.appendChild(row);
            saveProductsLocalStorage(productInfo);
            successToast.fire({
                icon: 'success',
                title: '¡El producto fue agregado correctamente!'
            });
        };
    };
};

function saveProductsLocalStorage(productInfo){
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

function updateProductsListUI(){
    if(structure.pathPage.includes('products.html')){
        const emptyRow = document.createElement('div');
        emptyRow.classList.add('my-5', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');
        emptyRow.innerHTML = `
            <h3>El carro está vacío</h3>
            <small>Cerrando esta ventana podés adquirir nuestros productos</small>
        `;
        productsList.appendChild(emptyRow);
    }
}

export function deleteProductItem(e){
    e.preventDefault();
    let product, productId;
    if(e.target.classList.contains('deleteProduct')){
        product = e.target.parentElement.parentElement.parentElement;
        productId = product.querySelector('button').getAttribute('data-id');
        product.remove();
        deleteProductLocalStoraged(productId);
        successToast.fire({
            icon: 'success',
            title: '¡Producto eliminado correctamente!'
        });
    };
};

function deleteProductLocalStoraged(productId){
    let productsLocalStoraged;
    productsLocalStoraged = getProductsLocalStorage();

    productsLocalStoraged.forEach(function(product, index){
        if(product.id === productId){
            productsLocalStoraged.splice(index, 1);
        };
    });
    localStorage.setItem('products', JSON.stringify(productsLocalStoraged));

    if(productsLocalStoraged.length === 0){
        updateCartUI();
    }
};

export function cleanCart(e){
    e.preventDefault();
    let productsLocalStoraged = getProductsLocalStorage();

    while(productsList.firstChild){
        productsList.removeChild(productsList.firstChild);
    };
    clearLocalStorage();
    if(productsLocalStoraged.length < 1){
        errorToast.fire({
            icon: 'error',
            title: '¡El carro ya está vacío!'
        });
    } else {
        updateProductsListUI();
        successToast.fire({
            icon: 'success',
            title: '¡El carro se vació correctamente!'
        });
    };
    return false;
};

function clearLocalStorage(){
    window.localStorage.removeItem('products');
};

export function processCart(e){
    e.preventDefault();
    let arrayProducts = getProductsLocalStorage();
    if(arrayProducts.length === 0){
        errorToast.fire({
            icon: 'error',
            title: '¡El carro está vacío!'
        });
    }
    else {
        location.href = '../pages/cart.html';
    };
};

export function readLocalStorageAtCart(){
    let productsLocalStoraged;
    productsLocalStoraged = getProductsLocalStorage();

    if(productsLocalStoraged.length > 0){
        productsLocalStoraged.forEach(function(productInfo){
            const div = document.createElement('div');
            div.classList.add('row', 'py-3', 'mb-3');
            div.innerHTML = `
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                    <div class="bg-image cardImg rounded">
                        <img class="w-100 rounded" src="${productInfo.image}" alt="${productInfo.productName}" loading="lazy">
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-5 productDetails">
                    <h6>${productInfo.productName}</h6>
                    <ul class="col-xs-12 col-sm-12 list-unstyled">
                        <li>${productInfo.currency}</li>
                        <li>${productInfo.hashRate}</li>
                        <li>${productInfo.algorithm}</li>
                        <li>${productInfo.power}</li>
                    </ul>
                    <div class="col-xs-12 col-sm-12 mt-5 mx-3 d-flex flex-row">
                        <button data-id="${productInfo.id}" class="mt-1 me-1 mb-1 p-2 material-symbols-sharp rounded btnDeleteItem">
                            delete
                        </button>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3 px-4">
                    <label for="${productInfo.amount}">Cantidad:</label>
                    <input type="number" class="form-control mb-2 mx-1 amountProduct" placeholder="¿Cuántos?" value="${productInfo.amount}" id="${productInfo.amount}" min="1" max="100">
                    <label for="${productInfo.price}">Precio:</label>
                    <input type="text" class="form-control mt-2 mx-1 productPrice" id="${productInfo.price}" value="${productInfo.price}" disabled>
                </div>
            `
            
            const details = document.createElement('div');
            details.classList.add('d-flex', 'flex-row', 'justify-content-between', 'border-top', 'py-1', 'productDetail');
            details.innerHTML = `
            <div class="d-flex flex-column mx-0 productName">
                ${productInfo.productName}
            </div>
            <div class="d-flex flex-column ms-5 pe-1">
                ${productInfo.price}
            </div>
            `;
            cartProductsResume.appendChild(div);
            priceResume.appendChild(details);
        });
    };
};

function updateCartUI(){
    if(structure.pathPage.includes('cart.html')){
        const div = document.createElement('div')
        div.classList.add('d-flex', 'flex-column', 'justify-content-center', 'align-items-center', 'my-5', 'py-5')
        div.innerHTML = `
            <h3>El carro está vacío</h3>
            <small>Podés volver a la sección de productos para ver nuestros productos</small>
        `;
        cartProductsResume.appendChild(div);

        const details = document.createElement('div');
            details.classList.add('d-flex', 'flex-row', 'justify-content-center', 'align-items-center', 'py-2', 'productDetail');
            details.innerHTML = `
            <h6>El carro está vacío</h6>
            `;
        priceResume.appendChild(details);

        let cartResume = document.getElementById('cartResume');
        cartResume.parentElement.parentElement.classList.add('d-none')
    }
}

export const deleteProductAtCart = (e) => {
    e.preventDefault();
    let productId, productDetails;
    productDetails = priceResume.querySelector('.productDetail');

    if(e.target.classList.contains('btnDeleteItem')){
        e.target.parentElement.parentElement.parentElement.remove();
        let product = e.target.parentElement.parentElement.parentElement;
        productId = product.querySelector('button').getAttribute('data-id');
        productDetails.remove();
        successToast.fire({
            icon: 'success',
            title: '¡Producto eliminado correctamente!'
        });
    };
    deleteProductLocalStoraged(productId);
    calculateTotal();
};

export const getEvent = (e) => {
    e.preventDefault();
    let id, amount, product, productsLocalStoraged, price;

    if (e.target.classList.contains("amountProduct")) {
        product = e.target.parentElement.parentElement;
        // console.log(product);
        id = product.querySelector("button").getAttribute("data-id");
        amount = product.querySelector("input").value;
        price = product.querySelector(".productPrice");

        productsLocalStoraged = getProductsLocalStorage();
        productsLocalStoraged.forEach(function (product) {
        if (product.id === id) {
            product.amount = Number(amount);
            let total = product.amount * product.price;
            price.textContent = total.toFixed(2);
        }
        });
        localStorage.setItem("products", JSON.stringify(productsLocalStoraged));
        calculateTotal();
    }
};

export function calculateTotal(){
    let productsLocalStoraged;
    let total = 0, subtotal = 0, taxes = 0;
    productsLocalStoraged = getProductsLocalStorage();

    productsLocalStoraged.forEach((product) => {
        let totalProducts = Number(product.amount * product.price);
        total = total + totalProducts;
    });

    taxes = parseFloat(total * 0.18).toFixed(2);
    subtotal = parseFloat(total - taxes).toFixed(2);

    document.querySelector('#total').textContent = total.toFixed(2);
    document.querySelector('.subtotal').textContent = subtotal;
    document.querySelector('#IVA').textContent = taxes;
};
