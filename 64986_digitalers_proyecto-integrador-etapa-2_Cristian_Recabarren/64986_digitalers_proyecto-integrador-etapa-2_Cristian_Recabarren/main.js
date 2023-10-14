// Estilos personalizados
import './css/styles.css'

// Librerías
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Source code 
import { 
    disableBtns,
    structure, 
    toggleTheme
} from './src/interface.js';

import { 
    initSystem, 
    isUserLoggedIn 
} from "./src/registerLoginForms/getUserInfo.js";

import { 
    getUsersLocalStoraged 
} from "./src/registerLoginForms/handleUsersLs.js";

import {
    checkLoginStatus, 
    logOutUser 
} from './src/registerLoginForms/handleLoginLogOutInterface.js';

import { 
    readLocalStorage
} from './src/cart/handleProductsLs.js'
import { 
    addGpuProduct
    , addProduct
} from './src/cart/addProducts.js';

import {
    calculateTotal,
    getEvent
} from './src/cart/cartEvents.js'

import {
    processCart
} from './src/cart/processProductsList.js'

import {
    cleanCart, 
    deleteProductItem, 
    deleteProductAtCart
} from './src/cart/removeProducts.js'

import {
    readLocalStorageAtCart
} from './src/cart/handleCartLs'

// Executions
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
    };
    if(!structure.pathPage.includes('aboutMining.html')){
        delete structure.infoItem
    };
    if(!structure.pathPage.includes('products.html')){
        delete structure.processCartBtn
    };
});

const productsSection = document.getElementById('productsSection');
const productsGpuSection = document.getElementById('productsGpuSection');
const productsListing = document.getElementById('cartResume');
const cartProductsList = document.getElementById('cartProductsProcessingList');

document.addEventListener('DOMContentLoaded', loadEvents());

function loadEvents(){
    const path = String(location.href);
    if(path.includes('cart')){
        cartLocation();
    } else if (path.includes('products')) {
        productsLocation();
    };

    if (!path.includes('cart')) {
        initSystem();
        checkLoginStatus(isUserLoggedIn);
        getUsersLocalStoraged();
        const logoutBtn = document.querySelector('#endClientSession');
        logoutBtn.addEventListener('click', () => logOutUser(isUserLoggedIn));
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
    disableBtns();
};

function cartLocation(){
    calculateTotal();
    document.addEventListener('DOMContentLoaded', readLocalStorageAtCart());
    cartProductsList.addEventListener('click', (e) => deleteProductAtCart(e));
    cartProductsList.addEventListener('change', (e) => getEvent(e));    
};


