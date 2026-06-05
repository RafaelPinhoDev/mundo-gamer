// 'use strict'

// import { criarPreview } from "./pages/preview.js"
// import { criarLogin } from "./pages/login.js"
// import { criarAzul } from "./pages/azul.js"

// const paginas = {

//     preview: {
//         titulo: 'PREVIEW DE IMAGEM', 
//         renderizar: criarPreview
//     },

//     login: {
//         titulo: 'LOGIN',
//         renderizar: criarLogin
//     },

//     azul:{
//         titulo: 'AZUL',
//         renderizar: criarAzul

//     }
// }

// export function navegarPara(paginas){
//     window.location.hash = paginas
// }

// export function renderizarPagina(){
    
//     const nomePagina = window.location.hash.replace('#', '')
//     const pagina = paginas[nomePagina]
//     const formulario = pagina.renderizar()
//     document.getElementById('titulo').textContent = pagina.titulo
//     document.getElementById('app-main').replaceChildren(formulario)

// }  

// // Adiciona uma função na janela 
// window.addEventListener('hashchange', renderizarPagina)

// renderizarPagina('login')


'use strict'

import { criarListagem } from './pages/consulta.js'

const estrutura = document.getElementById('estrutura')

async function iniciarApp() {
    console.log("1. app.js rodou e achou a div:", estrutura)

    try {
        console.log("2. Chamando a API para buscar os produtos...")
        const telaPronta = await criarListagem()
        
        console.log("3. Tela montada com sucesso! Colocando no HTML...")
        estrutura.replaceChildren(telaPronta)
        
    } catch (erro) {
        console.error("Deu erro na hora de montar a tela:", erro)
    }
}

iniciarApp()