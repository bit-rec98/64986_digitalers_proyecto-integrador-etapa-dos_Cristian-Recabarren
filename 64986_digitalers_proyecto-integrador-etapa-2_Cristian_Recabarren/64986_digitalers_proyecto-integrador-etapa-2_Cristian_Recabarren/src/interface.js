import { isUserLoggedIn } from "./registerLoginForms/getUserInfo";

const structure = {
    btnLightMode: document.getElementById('lightModeBtn'),
    btnDarkMode: document.getElementById('darkModeBtn'), 
    logoImg: document.getElementById('logoImg'),
    navBar: document.getElementById('navId'),
    loginBtn: document.getElementById('loginBtn'),
    logoutBtn: document.getElementById('logoutBtn'),
    logBtn: document.getElementById('logBtn'),
    html: document.getElementById('html'),
    body: document.getElementById('bodyId'),
    footer: document.getElementById('footerId'),
    p: document.querySelectorAll('p'),
    a: document.querySelectorAll('a'),
    label: document.querySelectorAll('label'),
    li: document.querySelectorAll('li'),
    h1: document.querySelectorAll('h1'),
    h2: document.querySelectorAll('h2'),
    h3: document.querySelectorAll('h3'),
    h4: document.querySelectorAll('h4'),
    h5: document.querySelectorAll('h5'),
    h6: document.querySelectorAll('h6'),
    cartBtn: document.getElementById('cartBtn'),
    pathPage: String(location.href),
    infoItem: document.getElementsByClassName('infoItem'),
    infoItemH5: document.querySelectorAll('.infoItem > H5'),
    infoItemP: document.querySelectorAll('.infoItem > p'),
    processCartBtn: document.getElementById('processCartList'),
    emptyCartList: document.getElementById('emptyCartList')
};

const themeToggler = {
    darkMode: function(){
        const colorBgBody = 'linear-gradient(to bottom right, #F85E00, #232323, #121212)';
        const colorBgFooter = 'linear-gradient(to bottom, #484848, #232323, #121212)';
        const whiteSmoke = '#f5f5f5';

        if(structure.pathPage.includes('products')){
            structure.cartBtn.style.color = whiteSmoke;
        };
        if(!structure.pathPage.includes('cart')){
            structure.loginBtn.style.color = whiteSmoke;
            structure.logoutBtn.style.color = whiteSmoke;
        };
        if(structure.pathPage.includes('products')){
            structure.cartBtn.style.color = whiteSmoke;
            structure.processCartBtn.style.color = whiteSmoke;
            structure.emptyCartList.style.color = whiteSmoke;
        };

        structure.html.setAttribute('data-bs-theme', 'dark')
        structure.btnDarkMode.setAttribute('class', 'material-symbols-sharp d-none')
        structure.btnLightMode.setAttribute('class', 'material-symbols-sharp d-block')
        structure.navBar.setAttribute('data-bs-theme', 'dark');
        structure.logoImg.src = '/img/logoDarkMode.png'
        structure.btnDarkMode.style.color = whiteSmoke;
        structure.btnLightMode.style.color = whiteSmoke;
        structure.body.style.background = colorBgBody;
        structure.footer.style.background = colorBgFooter;

        for(let i = 0; i < structure.a.length; i++){
            structure.a[i].style.color = whiteSmoke;
        }
        for(let i = 0; i < structure.p.length; i++){
            structure.p[i].style.color = whiteSmoke;
        }
        for(let i = 0; i < structure.li.length; i++){
            structure.li[i].style.color = whiteSmoke;
        }
        for(let i = 0; i < structure.h1.length; i++){
            structure.h1[i].style.color = whiteSmoke;
        }
        for(let i = 0; i < structure.h2.length; i++){
            structure.h2[i].style.color = whiteSmoke;
        }
        for(let i = 0; i< structure.h3.length; i++){
            structure.h3[i].style.color = whiteSmoke;
        }
        for(let i = 0; i< structure.h4.length; i++){
            structure.h4[i].style.color = whiteSmoke;
        }
        for(let i = 0; i< structure.h5.length; i++){
            structure.h5[i].style.color = whiteSmoke;
        }
        for(let i = 0; i< structure.h6.length; i++){
            structure.h6[i].style.color = whiteSmoke;
        }
        if(structure.pathPage.includes('aboutMining')){
            for(let i = 0; i < structure.infoItem.length; i++){
                structure.infoItem[i].addEventListener('mouseover', () => {
                    structure.infoItem[i].style.background = 'linear-gradient(to top right, rgba(245, 245, 245, 0.3), rgba(245, 245, 245, 0.5), rgba(245, 245, 245, 0.9))';
                    structure.infoItemH5[i].style.color = '#222222';
                    structure.infoItemP[i].style.color = '#222222';
                });
                structure.infoItem[i].addEventListener('mouseout', () => {
                    structure.infoItem[i].style.background = 'transparent';
                    structure.infoItemH5[i].style.color = '#F5F5F5';
                    structure.infoItemP[i].style.color = '#F5F5F5';
                });
            };
        };
    },
    lightMode: function(){
        const colorBgBody = 'linear-gradient(to bottom, #f5f5f5, #444444)';
        const colorBgFooter = 'linear-gradient(to top, #444444, #f5f5f5)';
        const lightBlack = '#222222';
        if(structure.pathPage.includes('products')){
            structure.cartBtn.style.color = lightBlack;
            structure.processCartBtn.style.color = lightBlack;
            structure.emptyCartList.style.color = lightBlack;
        };

        structure.html.setAttribute('data-bs-theme', 'light')
        structure.btnDarkMode.setAttribute('class', 'material-symbols-sharp d-block')
        structure.btnLightMode.setAttribute('class', 'material-symbols-sharp d-none')
        structure.logoImg.src = '/img/logoLightMode.png'
        structure.navBar.setAttribute('data-bs-theme', 'light');
        structure.btnDarkMode.style.color = lightBlack;
        structure.btnLightMode.style.color = lightBlack;
        structure.body.style.background = colorBgBody;
        if(!structure.pathPage.includes('cart')){
            structure.loginBtn.style.color = lightBlack;
            structure.logoutBtn.style.color = lightBlack;
        }
        structure.footer.style.background = colorBgFooter;

        for(let i = 0; i < structure.p.length; i++){
            structure.p[i].style.color = lightBlack;
        }
        for(let i = 0; i < structure.a.length; i++){
            structure.a[i].style.color = lightBlack;
        }
        for(let i = 0; i < structure.li.length; i++){
            structure.li[i].style.color = lightBlack;
        }
        for(let i = 0; i < structure.h1.length; i++){
            structure.h1[i].style.color = lightBlack;
        }
        for(let i = 0; i < structure.h2.length; i++){
            structure.h2[i].style.color = lightBlack;
        }
        for(let i = 0; i< structure.h3.length; i++){
            structure.h3[i].style.color = lightBlack;
        }
        for(let i = 0; i< structure.h4.length; i++){
            structure.h4[i].style.color = lightBlack;
        }
        for(let i = 0; i< structure.h5.length; i++){
            structure.h5[i].style.color = lightBlack;
        }
        for(let i = 0; i< structure.h6.length; i++){
            structure.h6[i].style.color = lightBlack;
        }
        if(structure.pathPage.includes('aboutMining')){
            for(let i = 0; i < structure.infoItem.length; i++){
                structure.infoItem[i].addEventListener('mouseover', () => {
                    structure.infoItem[i].style.background = 'linear-gradient(to top right, rgba(70, 70, 70, 0.3), rgba(49, 49, 49, 0.5) , rgba(84, 84, 84, 0.9))';
                    structure.infoItemH5[i].style.color = '#F5F5F5';
                    structure.infoItemP[i].style.color = '#F5F5F5';
                });
                structure.infoItem[i].addEventListener('mouseout', () => {
                    structure.infoItem[i].style.background = 'transparent';
                    structure.infoItemH5[i].style.color = lightBlack;
                    structure.infoItemP[i].style.color = lightBlack;
                });
            };
        };
    }
};

function toggleTheme(theme){
    if(theme === 'dark'){
        themeToggler.darkMode();
    } else if(theme === 'light'){
        themeToggler.lightMode();
    };
    localStorage.setItem('theme', theme);
};
const userTheme = localStorage.getItem('theme');
toggleTheme(userTheme || 'light');

export function disableBtns(){
    const addProductsBtns = document.querySelectorAll('.cardBody > .btnClass');
    if(Boolean(isUserLoggedIn.connectSession) === false){
        for(let i = 0; i < addProductsBtns.length; i++){
            addProductsBtns[i].classList.add('disabled');
        };
    }; 

    if(Boolean(isUserLoggedIn.connectSession) === false && structure.pathPage.includes('products')){
        structure.cartBtn.classList.add('d-none');
    } else if(Boolean(isUserLoggedIn.connectSession) === true && structure.pathPage.includes('products')) {
        structure.cartBtn.classList.add('d-block');
    };
};

export {
    toggleTheme,
    structure
};