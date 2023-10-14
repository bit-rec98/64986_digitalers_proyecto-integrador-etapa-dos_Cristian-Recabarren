import { getProductsLocalStorage } from "./handleProductsLs";

export const getEvent = (e) => {
    e.preventDefault();
    let id, amount, product, productsLocalStoraged, price;

    if (e.target.classList.contains("amountProduct")) {
        product = e.target.parentElement.parentElement;
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