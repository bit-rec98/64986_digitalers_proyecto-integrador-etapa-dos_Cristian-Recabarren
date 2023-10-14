import { getProductsLocalStorage } from "./handleProductsLs";
import { cartProductsResume, priceResume } from "./mainStructuresForProducts";

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