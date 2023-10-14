import { cartProductsResume, priceResume, productsList } from "./mainStructuresForProducts";
import { successToastB } from "../swalUsage";
import { structure } from "../interface";

export function updateCartUI(){
    if(structure.pathPage.includes('cart.html')){
        const div = document.createElement('div');
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
        cartResume.parentElement.parentElement.classList.add('d-none');

        successToastB.fire({
            icon: 'success',
            title: '¡Regresando a la sección de productos!'
        });

        setTimeout(() => {
            window.location.assign('products.html');
        }, 5000);
    };
};