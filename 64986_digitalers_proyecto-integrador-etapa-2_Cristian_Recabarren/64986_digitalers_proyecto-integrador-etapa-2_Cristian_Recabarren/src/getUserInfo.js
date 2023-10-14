import Swal from 'sweetalert2';
import { loginPasswordVisibility, registerPasswordVisibility } from "./passwordHider.js";
import { getUserDataLogin, getUserDataRegister } from "./registerLoginUsers.js";

export let isUserLoggedIn = {
    connectSession: JSON.parse(localStorage.getItem('isUserLoggedIn')) || false
};

export const errorToast = Swal.mixin({
    toast: true,
    position: "bottom-left",
    iconColor: "#222222",
    color: "#222222",
    background: "#e63946",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});

export const successToast = Swal.mixin({
    toast: true,
    position: "bottom-left",
    iconColor: "#222222",
    color: "#222222",
    background: "#f85e00",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});

export function initSystem(){
    const formStructure = {
        loginForm: document.getElementById('loginForm'),
        loginButton: loginForm.querySelector('#logBtn'),
        registerForm: document.getElementById('registerForm'),
        registerButton: registerForm.querySelector('#registerBtn'),
        submitRegisterBtn: registerForm.querySelector('#submitRegisterBtn'),
        submitLoginBtn: loginForm.querySelector('#submitLoginBtn'),
        loginNavBtn: document.getElementById('loginBtn')
    }
    loginPasswordVisibility();
    registerPasswordVisibility();
    getUserDataLogin(formStructure, isUserLoggedIn);
    getUserDataRegister(formStructure, isUserLoggedIn);
};