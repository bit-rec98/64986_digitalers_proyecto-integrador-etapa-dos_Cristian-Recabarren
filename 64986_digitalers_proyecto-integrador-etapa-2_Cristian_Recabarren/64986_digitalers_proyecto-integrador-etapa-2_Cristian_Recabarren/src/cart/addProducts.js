import { readGpuInfo, readProductInfo } from "./getProductsInfo";
import { saveProductsLocalStorage } from "./handleProductsLs";
import { productsList } from "./mainStructuresForProducts";
import { errorToast, successToast } from "../swalUsage";

export function addProduct(e){
    e.preventDefault();
    if(e.target.classList.contains('btnClass')){
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

export function addToCart(productInfo){
    let productType = productInfo;
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