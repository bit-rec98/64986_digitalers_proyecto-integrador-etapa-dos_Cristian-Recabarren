import { errorToast } from "../swalUsage";
import { getProductsLocalStorage } from "./handleProductsLs";

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