// Estilos personalizados
import '/css/styles.css';

// Librerías
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Source code 
import { 
    structure, 
    toggleTheme
} from './src/interface.js';

import { 
    addProduct,
    readLocalStorage, 
    deleteProductItem,
    cleanCart,
    processCart,
    readLocalStorageAtCart,
    deleteProductAtCart,
    getEvent,
    calculateTotal,
    addGpuProduct,
} from './src/cart.js'

import { 
    checkLoginStatus,
    getUsersLocalStoraged,
    initSystem,
    isUserLoggedIn,
    logOutUser
} from './src/getUserInfo.js';

structure.btnDarkMode.addEventListener("click", () => {
    toggleTheme('dark');
    if(structure.pathPage.includes('cart.html')){
        delete structure.loginBtn;
    }
    if(!structure.pathPage.includes('aboutMining.html')){
        delete structure.infoItem
    }
    if(!structure.pathPage.includes('products.html')){
        delete structure.processCartBtn
    }
})

structure.btnLightMode.addEventListener("click", () => {
    toggleTheme('light');
    if(structure.pathPage.includes('cart.html')){
        delete structure.loginBtn;
    }
    if(!structure.pathPage.includes('aboutMining.html')){
        delete structure.infoItem
    }
    if(!structure.pathPage.includes('products.html')){
        delete structure.processCartBtn
    }
})

const productsSection = document.getElementById('productsSection');

const productsGpuSection = document.getElementById('productsGpuSection');

const productsListing = document.getElementById('cartResume');

const cartProductsList = document.getElementById('cartProductsProcessingList');

loadEvents();
function loadEvents(){
    const path = String(location.href);
    if(path.includes('cart.html')){
        cartLocation();
    } else if (path.includes('products.html')) {
        productsLocation();
    };

    if (!path.includes('cart.html')) {
        initSystem();
        checkLoginStatus(isUserLoggedIn);
        getUsersLocalStoraged();

        const logoutBtn = document.querySelector('#endClientSession');
        logoutBtn.addEventListener('click', () => logOutUser(isUserLoggedIn.connectSession));
    };
};

function productsLocation() {
    const cleanCartBtn = productsListing.querySelector('#emptyCartList');
    const processCartBtn = productsListing.querySelector('#processCartList');

    productsSection.addEventListener('click', (e) => {
        addProduct(e);
    });
    productsGpuSection.addEventListener('click', (e) => {
        addGpuProduct(e);
    });
    document.addEventListener('DOMContentLoaded', readLocalStorage());
    productsListing.addEventListener('click', e => deleteProductItem(e));
    cleanCartBtn.addEventListener('click', e => cleanCart(e));
    processCartBtn.addEventListener('click', e => processCart(e));
};
function cartLocation(){
    calculateTotal();
    document.addEventListener('DOMContentLoaded', readLocalStorageAtCart());
    cartProductsList.addEventListener('click', (e) => deleteProductAtCart(e));
    cartProductsList.addEventListener('change', (e) => getEvent(e));    
};


