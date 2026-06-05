'use strict'

import { getProdutos, deletarProduto } from "../functions/produtos.js"
import { criarEstruturaEdicao } from "./editar.js"
// Função de excluir produto
async function excluirProduto(id, cardElemento) {
    const confirmarExclusao = confirm("Você deseja realmente excluir esse produto?")

    if (confirmarExclusao){
        try{
            await deletarProduto(id)
            cardElemento.remove()
            alert('Produto excluído com sucesso!!')
        }catch(erro){
            console.error("Erro ao excluir produto: ", erro.message)
            alert("Não foi possível excluir o produto.")
        }
    }
}

// Levará pra página editar produto
async function editarProduto(id) {
    const estrutura = document.getElementById('estrutura')
    const telaEdicao = await criarEstruturaEdicao(id)
    estrutura.replaceChildren(telaEdicao)
}

export async function criarListagem() {
    // Container principal paea agrupar os cards
    const sectionListagem = document.createElement('section')
    sectionListagem.id = 'catalogo-produtos' 
    sectionListagem.className = 'container mt-5'
    
    // Título da página
    const titulo = document.createElement('h1')
    titulo.className = 'text-center mb-5'
    titulo.textContent = 'Catálogo de Produtos'
    sectionListagem.appendChild(titulo)

    // Barra de pesquisa
    const divPesquisa = document.createElement('div')
    divPesquisa.className = 'd-flex justify-content-center mb-5 gap-2 w-100 col-md-8 mx-auto'

    const inputPesquisa = document.createElement('input')
    inputPesquisa.type = 'text'
    inputPesquisa.className = 'form-control w-50'
    inputPesquisa.placeholder = 'Buscar produto pelo nome...'
    inputPesquisa.id = 'input-pesquisa'

    const btnPesquisar = document.createElement('button')
    btnPesquisar.className = 'btn btn-primary px-4'
    btnPesquisar.textContent = 'Pesquisar'

    divPesquisa.append(inputPesquisa, btnPesquisar)
    sectionListagem.appendChild(divPesquisa)


    // Container da grade que puxa o padding do CSS
    const listaProdutos = document.createElement('div')
    listaProdutos.id = 'lista-produtos' 
    listaProdutos.className = 'row' 
    sectionListagem.appendChild(listaProdutos)

    // Função para buscar contatos
    async function atualizarGrid(termoBusca = "") {
        try {
            // Limpa a tela antes de desenhar os novos cards pesquisados
            listaProdutos.replaceChildren()

            let produtos = await getProdutos()

            // Se o usuário digitou algo, filtra a lista
            if (termoBusca !== "") {
                produtos = produtos.filter(produto => 
                    produto.nome.toLowerCase().includes(termoBusca.toLowerCase())
                )
            }

            // Mensagem caso não encontre nada ou o banco esteja vazio
            if (produtos.length === 0) {
                const mensagem = document.createElement('p')
                mensagem.className = 'text-center text-muted fw-bold mt-5 w-100'
                mensagem.textContent = termoBusca === "" ? 'Nenhum produto cadastrado ainda.' : `Nenhum produto encontrado com o nome: "${termoBusca}"`
                listaProdutos.appendChild(mensagem)
                return 
            }

            // Criação dos cards
            produtos.forEach(produto => {
                const coluna = document.createElement('div')
                coluna.className = 'col-12 col-sm-6 col-lg-3 mb-4'
                coluna.id = `card-${produto.id}`

                const card = document.createElement('div')
                card.className = 'card'

                const imagem = document.createElement('img')
                imagem.src = produto.imagemUrl || './img/semImagem.png'
                imagem.alt = produto.nome

                // 1. ID em uma linha centralizada antes do nome
                const boxId = document.createElement('div')
                boxId.className = 'mt-3 mb-2 px-2' // px-2 dá um respiro para a faixa não grudar nas paredes do card
                
                const idInterface = document.createElement('div') // Mudamos de span para div
                idInterface.textContent = `Id: ${produto.id}`
                idInterface.className = 'id-pequeno d-block text-center' 
                boxId.appendChild(idInterface)

                // 2. Nome do produto em destaque
                const nome = document.createElement('h4')
                nome.className = 'fw-bold text-center mb-3 px-2'
                nome.textContent = produto.nome

                //  Container de informações centralizado
                const infoContainer = document.createElement('div')
                infoContainer.className = 'info-container text-center' 

                // Preço 
                const preco = document.createElement('h5')
                preco.className = 'fw-bold text-success mb-2'
                preco.textContent = `Preço: R$ ${produto.preco.toFixed(2).replace('.', ',')}`

                // Estoque
                const estoque = document.createElement('p')
                estoque.className = 'mb-2 fw-bold'
                
                if (produto.estoque > 0) {
                    estoque.classList.add('text-primary') 
                    estoque.textContent = `Em estoque: ${produto.estoque} unidades.`
                } else {
                    estoque.classList.add('text-danger') 
                    estoque.textContent = `Esgotado`
                }

                // Descrição 
                const descricao = document.createElement('p')
                descricao.className = 'text-muted px-2'
                descricao.textContent = produto.descricao

                infoContainer.append(preco, estoque, descricao)

                // Grupo de botões
                const btnGroup = document.createElement('div')
                btnGroup.className = 'btn-group-custom'

                const btnEditar = document.createElement('button')
                btnEditar.textContent = 'Editar'
                btnEditar.className = 'btn btn-warning mt-2'
                btnEditar.onclick = () => editarProduto(produto.id)

                const btnExcluir = document.createElement('button')
                btnExcluir.textContent = 'Excluir'
                btnExcluir.className = 'btn btn-danger mt-2'
                btnExcluir.onclick = () => excluirProduto(produto.id, coluna)

                btnGroup.append(btnEditar, btnExcluir)

                // Monta o card respeitando a nova ordem
                card.append(imagem, boxId, nome, infoContainer, btnGroup)
                coluna.appendChild(card)
                listaProdutos.appendChild(coluna)
            })

        } catch (erro) {
            console.error("Erro ao carregar produtos:", erro)
            const erroMensagem = document.createElement('p')
            erroMensagem.className = 'text-center text-danger fw-bold mt-5 w-100'
            erroMensagem.textContent = 'Erro ao conectar com a API.'
            listaProdutos.appendChild(erroMensagem)
        }
    }

    // Eventos

    btnPesquisar.addEventListener('click', () => {
        atualizarGrid(inputPesquisa.value)
    })

    // Dispara a pesquisa ao apertar "Enter" no teclado
    inputPesquisa.addEventListener('keypress', (evento) => {
        if (evento.key === 'Enter') {
            atualizarGrid(inputPesquisa.value)
        }
    })

    // Carrega todos os produtos assim que a página é montada pela primeira vez
    await atualizarGrid()

    return sectionListagem
}