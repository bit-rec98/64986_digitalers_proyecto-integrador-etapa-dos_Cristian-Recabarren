import { structure } from "./interface";
import Swal from 'sweetalert2'

export let isUserLoggedIn = {
    connectSession: JSON.parse(localStorage.getItem('isUserLoggedIn')) || false
};

const errorToast = Swal.mixin({
    toast: true,
    position: "bottom-left",
    iconColor: "#222222",
    color: "#222222",
    background: "#e63946",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});

const successToast = Swal.mixin({
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
    const usersRegistered = getUsersLocalStoraged();
    if (usersRegistered.length > 0) {
        getUserDataLogin(formStructure, isUserLoggedIn);
        getUserDataRegister(formStructure, isUserLoggedIn);
    } else {
        getUserDataRegister(formStructure, isUserLoggedIn);
    };
};

if(!structure.pathPage.includes('cart.html')){
    const passwordInput = document.getElementById('inputPassword');
    const visibilityOn = document.getElementById('visibilityOn');
    const visibilityOff = document.getElementById('visibilityOff');

    visibilityOn.addEventListener("click", () => {
        togglePasswordVisibility();
    });

    visibilityOff.addEventListener("click", () => {
        togglePasswordVisibility();   
    });

    function togglePasswordVisibility() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            visibilityOn.classList.add('d-none');
            visibilityOn.classList.remove('d-block');

            visibilityOff.classList.add('d-block');
            visibilityOff.classList.remove('d-none')
        } else {
            passwordInput.type = "password";
            visibilityOn.classList.add('d-block');
            visibilityOn.classList.remove('d-none');

            visibilityOff.classList.add('d-none');
            visibilityOff.classList.remove('d-block')
        }
    }
}



function getUserDataRegister(formStructure, isUserLoggedIn){
    formStructure.registerButton.addEventListener('click', (e) => {
        e.preventDefault();
        const formData = {
            name: formStructure.registerForm.querySelector('#inputRegisterFullName').value,
            email: formStructure.registerForm.querySelector('#inputRegisterEmail').value,
            password: formStructure.registerForm.querySelector('#inputRegisterPassword').value,
        };
        const usersRegistered = getUsersLocalStoraged();
        const isUserRegistered = usersRegistered.some(user => user.email === formData.email);

        if (isUserRegistered === true) {
            errorToast.fire({
                icon: 'error',
                title: '¡Usuario ya registrado!'
            });
        } else {
            formData.id = generateUniqueUserId(usersRegistered);
            buildUser(formData);

            if(Boolean(isUserLoggedIn.connectSession) === false){
                isUserLoggedIn.connectSession = true;
                localStorage.setItem('isUserLoggedIn', JSON.stringify(isUserLoggedIn.connectSession));
            }

            formStructure.submitRegisterBtn.click();
            formStructure.registerForm.submit();
        };
    });
};

function getUserDataLogin(formStructure, isUserLoggedIn){
    formStructure.loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        const formData = {
            email: formStructure.loginForm.querySelector('#inputEmail').value,
            password: formStructure.loginForm.querySelector('#inputPassword').value,
            keepConnected: formStructure.loginForm.querySelector('#logCheckBox').checked, 
        };
        const rememberMe = formStructure.loginForm.querySelector('#logCheckBox').checked;

        const usersRegistered = getUsersLocalStoraged();
        const user = usersRegistered.find(u => u.email === formData.email);
        
        if (user && user.password === formData.password) {
            if (formData.keepConnected) {
                localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
            }

            if(Boolean(isUserLoggedIn.connectSession) === false){
                isUserLoggedIn.connectSession = true;
                localStorage.setItem('isUserLoggedIn', JSON.stringify(isUserLoggedIn.connectSession));
            }

            formStructure.submitLoginBtn.click();
            formStructure.loginForm.submit();

            successToast.fire({
                icon: 'success',
                title: '¡Bienvenido/a!'
            })
        } else {
            errorToast.fire({
                icon: 'error',
                title: '¡Correo y/o contraseña incorrectos!'
            });
        };
    });
};

function buildUser(userInfo){ //* Getting register formData
    class User {
        constructor(name, email, password, id){
            this.name = name;
            this.email = email;
            this.password = password;
            this.id = id;
        };
    };
    let newUser = new User(userInfo.name, userInfo.email, userInfo.password, userInfo.id);
    saveUserLocalStorage(newUser);
};

function generateUniqueUserId(users) {
    //* Find the highest ID among existing users and add 1
    const maxId = users.reduce((max, user) => Math.max(max, user.id || 0), 0);
    return maxId + 1;
};

function saveUserLocalStorage(newUser){
    let newUsers;
    newUsers = getUsersLocalStoraged();
    newUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(newUsers));
};

export function getUsersLocalStoraged(){
    let usersLocalStoraged;
    if(localStorage.getItem('users') === null){
        usersLocalStoraged = [];
    } else {
        usersLocalStoraged = JSON.parse(localStorage.getItem('users'));
    };
    return usersLocalStoraged;
};

export function checkLoginStatus(isUserLoggedIn) {
    const logBtnsContainer = document.getElementById('log');
    const loginBtn = logBtnsContainer.querySelector('#loginBtn');
    const logoutBtn = logBtnsContainer.querySelector('#logoutBtn');
    let cartBtn = null;

    if (structure.pathPage.includes('products.html')) {
        cartBtn = document.getElementById('cartBtn');
    }

    isUserLoggedIn.connectSession = JSON.parse(localStorage.getItem('isUserLoggedIn'));

    if (Boolean(isUserLoggedIn.connectSession) === true) {
        loginBtn.classList.add('d-none');
        logoutBtn.classList.remove('d-none');

        if (cartBtn) {
            cartBtn.classList.remove('d-none');
        }
    } else {
        loginBtn.classList.remove('d-none');
        logoutBtn.classList.add('d-none');

        if (cartBtn) {
            cartBtn.classList.add('d-none');
        };
    };
};


export function logOutUser(sessionStatus){ //* Getting isUserLoggedIn object
    let userSessionStatus = sessionStatus;
    if(Boolean(userSessionStatus) === true){
        isUserLoggedIn = false;
        localStorage.setItem("isUserLoggedIn", JSON.stringify(isUserLoggedIn));
        successToast.fire({
            position: 'center',
            icon: 'success',
            title: '¡Hasta la próxima!'
        })
    }; 
    setTimeout(() => {
        window.location.reload();
    }, 3000);
};