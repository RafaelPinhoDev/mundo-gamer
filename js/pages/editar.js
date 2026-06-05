'use strict'

import { preview, uploadImagem } from "../functions/preview.js"
import { getProdutos, atualizarProduto } from "../functions/produtos.js"
import { navegarPara, renderizarPagina } from "../app.js"

async function salvarEdicao(idProduto, nome, descricao, preco, estoque, inputImagem, imagemPreview, imagemAntigaUrl) {
    
    if(nome.value === "" || preco.value === "" || estoque.value === ""){
        alert('Preencha pelo menos o Nome, o Preço e o Estoque')
        return
    }

    try {
        let linkImagem = imagemAntigaUrl // Por padrão, mantém a imagem antiga

        // Se o usuário selecionou um arquivo novo, fazemos o upload
        if (inputImagem.files && inputImagem.files.length > 0) {
            linkImagem = await uploadImagem()
        }

        const produtoAtualizado = {
            nome: nome.value,
            descricao: descricao.value,
            preco: parseFloat(preco.value), 
            estoque: parseInt(estoque.value),
            imagemUrl: linkImagem 
        }

        await atualizarProduto(idProduto, produtoAtualizado)
        alert('Produto atualizado com sucesso!')

        // Redireciona de volta para a tela de consulta após salvar
        navegarPara('#consulta')
        renderizarPagina() // Força a atualização da tela

    } catch(error) {
        console.error(error)
        alert('Erro ao tentar atualizar o produto.')
    }
}

export async function criarEstruturaEdicao(idProduto) {
    const formulario = document.createElement('form')
    formulario.className = 'card shadow p-5 rounded-4 bg-white col-12 col-md-8 col-lg-6 mx-auto mt-5 mb-5' 

    // Título
    const titulo = document.createElement('h1')
    titulo.className = 'text-center mb-4'
    titulo.textContent = 'Editar Produto'
    formulario.append(titulo)

    // Mensagem de Carregamento enquanto a API processa
    const carregando = document.createElement('p')
    carregando.className = 'text-center text-primary fw-bold'
    carregando.textContent = 'Carregando dados do produto...'
    formulario.appendChild(carregando)

    try {
        // Busca todos os produtos e filtra pelo ID que queremos editar
        const produtos = await getProdutos()
        const produto = produtos.find(p => String(p.id) === String(idProduto))

        if (!produto) {
            throw new Error("Produto não encontrado")
        }

        // Remove a mensagem de carregamento quando encontra
        carregando.remove()

        // Agrupamento do ID
        const grupoId = document.createElement('div')
        grupoId.className = 'mb-3'
        const labelId = document.createElement('label')
        labelId.className = 'form-label'
        labelId.textContent = 'ID'
        const id = document.createElement('input')
        id.className = 'form-control'
        id.type = 'number'
        id.value = produto.id
        id.disabled = true 
        grupoId.append(labelId, id)

        // Agrupamento do Nome 
        const grupoNome = document.createElement('div')
        grupoNome.className = 'mb-3'
        const labelNome = document.createElement('label')
        labelNome.className = 'form-label'
        labelNome.textContent = 'Nome do Produto: '
        const nome = document.createElement('input')
        nome.className = 'form-control'
        nome.type = 'text'
        nome.value = produto.nome // Preenche com o dado do banco
        grupoNome.append(labelNome, nome)
        
        //  Agrupamento do Preço
        const grupoPreco = document.createElement('div')
        grupoPreco.className = 'mb-3'
        const labelPreco = document.createElement('label')
        labelPreco.className = 'form-label'
        labelPreco.textContent = 'Preço (R$): '
        const preco = document.createElement('input')
        preco.className = 'form-control'
        preco.type = 'number'
        preco.min = '0'        
        preco.step = '0.50'    
        preco.value = produto.preco // Preenche com o dado do banco
        grupoPreco.append(labelPreco, preco)

        //  Agrupamento do Estoque
        const grupoEstoque = document.createElement('div')
        grupoEstoque.className = 'mb-3'
        const labelEstoque = document.createElement('label')
        labelEstoque.className = 'form-label'
        labelEstoque.textContent = 'Estoque (Unidades): '
        const estoque = document.createElement('input')
        estoque.className = 'form-control'
        estoque.type = 'number'
        estoque.min = '0'     
        estoque.step = '1'    
        estoque.value = produto.estoque // Preenche com o dado do banco
        grupoEstoque.append(labelEstoque, estoque)

        //  Agrupamento da Descrição
        const grupoDescricao = document.createElement('div')
        grupoDescricao.className = 'mb-3'
        const labelDescricao = document.createElement('label')
        labelDescricao.className = 'form-label'
        labelDescricao.textContent = 'Descrição: '
        const descricao = document.createElement('textarea')
        descricao.className = 'form-control'
        descricao.rows = 3
        descricao.value = produto.descricao // Preenche com o dado do banco
        grupoDescricao.append(labelDescricao, descricao)

        // Agrupamento UploadImagem
        const grupoImagem = document.createElement('div')
        grupoImagem.className = 'mb-4 d-flex flex-column align-items-center'

        const labelImagem = document.createElement('label')
        labelImagem.className = 'form-label align-self-start'
        labelImagem.textContent = 'Foto do Produto (Deixe em branco para manter a atual)'

        const inputImagem = document.createElement('input')
        inputImagem.className = 'form-control mb-3'
        inputImagem.type = 'file'
        inputImagem.id = 'preview-input' 
        inputImagem.accept = 'image/*'
        inputImagem.addEventListener('change', preview)

        const imagemPreview = document.createElement('img')
        imagemPreview.id = 'preview-image'
        imagemPreview.className = 'img-thumbnail'
        imagemPreview.style.height = '200px'
        imagemPreview.style.width = '200px'
        imagemPreview.style.objectFit = 'cover'
        
        // Coloca a imagem que veio do banco no preview ou a nossa local
        imagemPreview.src = produto.imagemUrl || './img/semImagem.png'
        grupoImagem.append(labelImagem, inputImagem, imagemPreview)

        //  Grupo de botões
        const grupoBotoes = document.createElement('div')
        grupoBotoes.className = 'd-flex gap-3 mt-4'

        // Botão Cancelar (Volta pra listagem)
        const btnCancelar = document.createElement('button')
        btnCancelar.className = 'btn btn-danger w-50'
        btnCancelar.type = 'button'
        btnCancelar.textContent = 'Cancelar'
        btnCancelar.onclick = () => {
            navegarPara('#consulta')
            renderizarPagina() // Força a atualização da tela
        }

        // Botão Salvar Edição
        const btnSalvar = document.createElement('button')
        btnSalvar.className = 'btn btn-warning w-50 fw-bold' // Amarelinho para indicar edição
        btnSalvar.type = 'button'
        btnSalvar.textContent = 'Salvar Alterações'
        // Passamos produto.imagemUrl no final para não perder a foto original
        btnSalvar.onclick = () => salvarEdicao(produto.id, nome, descricao, preco, estoque, inputImagem, imagemPreview, produto.imagemUrl)

        grupoBotoes.append(btnCancelar, btnSalvar)

    
        formulario.append(grupoId, grupoNome, grupoDescricao, grupoPreco, grupoEstoque, grupoImagem, grupoBotoes)

    } catch (erro) {
        console.error("Erro ao carregar edição:", erro)
        carregando.className = 'text-center text-danger fw-bold'
        carregando.textContent = 'Erro ao carregar dados do produto.'
    }

    return formulario
}