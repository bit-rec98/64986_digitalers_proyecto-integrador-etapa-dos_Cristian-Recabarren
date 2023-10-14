import { calculateTotal } from "./cartEvents";
import { clearLocalStorage, deleteProductLocalStoraged, getProductsLocalStorage } from "./handleProductsLs";
import { errorToast, successToast } from "../swalUsage";
import { priceResume, productsList } from "./mainStructuresForProducts";

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
        successToast.fire({
            icon: 'success',
            title: '¡El carro se vació correctamente!'
        });
    };
    return false;
};

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