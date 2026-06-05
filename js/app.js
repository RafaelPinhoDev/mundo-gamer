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

// Importe a função do arquivo onde você criou o formulário
// Ajuste o caminho "./cadastro.js" para o nome correto do seu arquivo
import { criarEstruturaCadastro } from './pages/cadastro.js'

// Captura a div do HTML
const estrutura = document.getElementById('estrutura')

// Executa a função que cria o form e coloca ele na tela
estrutura.replaceChildren(criarEstruturaCadastro())