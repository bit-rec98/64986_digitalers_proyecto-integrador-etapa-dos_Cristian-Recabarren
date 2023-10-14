import { addToCart } from "./addProducts";
import { getProductsLocalStorage } from "./handleProductsLs";
import { errorToast } from "../swalUsage";

export function readProductInfo(product){
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

export function readGpuInfo(gpuProduct){
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