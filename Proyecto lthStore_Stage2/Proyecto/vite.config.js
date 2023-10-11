import {resolve} from 'node:path'

export default {
    server: {
        port: "2222",
    },
    css:{
        devSourcemap: true,
    },
    build: {
        emptyOutDir: true,
        rollupOptions:{
            input:{
                about: resolve('./pages/aboutMining.html'),
                cart: resolve('./pages/cart.html'),
                us: resolve('./pages/us.html'),
                products: resolve('./pages/products.html') ,
                index: resolve('./index.html')
            }
        }
    }
}

// npm run build una vez que se haya configurado
// Se va a crear una carpeta llamada dist que es la que se debe subir como versión final 
