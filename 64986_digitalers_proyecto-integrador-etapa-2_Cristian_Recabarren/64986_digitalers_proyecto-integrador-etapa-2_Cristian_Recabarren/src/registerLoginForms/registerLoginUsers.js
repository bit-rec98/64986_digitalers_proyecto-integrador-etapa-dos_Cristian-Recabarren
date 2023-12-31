import { buildUser } from "./buildUserInstances";
import { errorToast, errorToastB, successToast } from "../swalUsage";
import { getUsersLocalStoraged } from "./handleUsersLs";

function generateUniqueUserId(users) {
    //* Find the highest ID among existing users and add 1
    const maxId = users.reduce((max, user) => Math.max(max, user.id || 0), 0);
    return maxId + 1;
};

export function getUserDataRegister(formStructure, isUserLoggedIn){
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
        } else if ((!String(formData.email).includes('@')) || (!String(formData.email).includes('.'))){
            errorToastB.fire({
                icon: 'error',
                title: '¡Tu usuario debe incluir @ y la correspondiente extensión con punto (.com/.net/.ar/.io), según corresponda!'
            });
        } else {
            formData.id = generateUniqueUserId(usersRegistered);
            buildUser(formData);
            if(Boolean(isUserLoggedIn.connectSession) === false){
                let isClientConnected = isUserLoggedIn.connectSession
                isClientConnected = true;
                localStorage.setItem('isUserLoggedIn', JSON.stringify(isClientConnected));
            };
            
            successToast.fire({
                icon: 'success',
                title: '¡Bienvenido/a!'
            });
            formStructure.submitRegisterBtn.click();

            setTimeout(() =>{
                window.location.reload();
            }, 3000);
        };
    });
};

export function getUserDataLogin(formStructure, isUserLoggedIn){
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
            };
            
            if(Boolean(isUserLoggedIn.connectSession) === false){
                let isClientConnected = isUserLoggedIn.connectSession
                isClientConnected = true;
                localStorage.setItem('isUserLoggedIn', JSON.stringify(isClientConnected));
            };
            
            successToast.fire({
                icon: 'success',
                title: '¡Bienvenido/a!'
            });
            formStructure.submitLoginBtn.click();
        } else {
            errorToast.fire({
                icon: 'error',
                title: '¡Correo y/o contraseña incorrectos!'
            });
        };
    });
};