'use strict'

// Importa as funções das telas de cadastro e consulta
import { criarEstruturaCadastro } from "./pages/cadastro.js"
import { criarListagem } from "./pages/consulta.js"

const paginas = {

    cadastro:{
        renderizar: criarEstruturaCadastro
    },
    consulta: {
        renderizar: criarListagem
    }
}

export function navegarPara(hash){
    window.location.hash = hash
}

export async function renderizarPagina() {
    const estrutura = document.getElementById('estrutura')

    let nomePagina = window.location.hash.replace('#', '')

    if (!nomePagina || !paginas[nomePagina]) {
        nomePagina = 'consulta'
        window.location.hash = '#consulta'
        return 
    }

    const pagina = paginas[nomePagina]

    // Mensagem de carregamento
    const mensagemCarregando = document.createElement('p')
    mensagemCarregando.className = 'text-center mt-5 fw-bold text-primary'
    mensagemCarregando.textContent = 'Carregando tela...'
    estrutura.replaceChildren(mensagemCarregando)

    try {
        const telaPronta = await pagina.renderizar()
        estrutura.replaceChildren(telaPronta)
    } catch (erro) {
        console.error("Erro ao renderizar a página:", erro)
        
        // Criando a mensagem de erro sem innerHTML
        const mensagemErro = document.createElement('p')
        mensagemErro.className = 'text-center mt-5 text-danger fw-bold'
        mensagemErro.textContent = 'Erro ao carregar a página.'
        estrutura.replaceChildren(mensagemErro)
    }

}

window.addEventListener('hashchange', renderizarPagina)

window.addEventListener('load', () => {
    if (window.location.hash === '') {
        window.location.hash = '#consulta'
    } else {
        renderizarPagina()
    }
})


document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        const hashAtual = window.location.hash;
        const hashClicado = link.getAttribute('href');

        if (hashAtual === hashClicado) {
            // Se clicar no link que já está na URL, força o redesenho
            renderizarPagina();
        }
    });
});