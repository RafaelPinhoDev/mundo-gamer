'use strict'

import { preview, uploadImagem } from "../functions/preview.js"
import { getProdutos, criarProduto, atualizarProduto, deletarProduto } from "../functions/produtos.js"

async function salvarProduto(id, nome, descricao, preco,estoque, inputImagem, imagemPreview) {
    
    if(nome.value === "" || preco.value === "" || estoque.value === ""){
        alert('Preencha pelo menos o Nome, Preço e Estoque')
        return
    }

    try{
        const linkImagem = await uploadImagem( )

        if (linkImagem === "") {
            alert('Por favor, selecione uma imagem para o produto!')
            return
        }

        const novoProduto = {
            nome: nome.value,
            descricao: descricao.value,
            preco: parseFloat(preco.value), 
            estoque: parseInt(estoque.value),
            imagemUrl: linkImagem 
        }

        await criarProduto(novoProduto)
        alert('Produto cadastrado com sucesso!')

        limparCampos(id, nome, descricao, preco, estoque, inputImagem, imagemPreview)
    }catch(error){
        console.error(error)
        alert('Erro ao tentar cadastrar produto')
    }
    
}

function limparCampos(id, nome, descricao, preco, estoque, inputImagem, imagemPreview){
    id.value = ' ';
    nome.value = '';
    descricao.value = '';
    preco.value = '';
    estoque.value = '';
    inputImagem.value = '';
    imagemPreview.src = 'https://placehold.co/200x200/e9ecef/495057?text=Sem+Foto';
}


export function criarEstruturaCadastro(produto){

    const formulario = document.createElement('form')
    formulario.className = 'card shadow p-5 rounded-4 bg-white col-12 col-md-8 col-lg-6 mx-auto mt-5' 

    // Título
    const titulo = document.createElement('h1')
    titulo.className = 'text-center mb-4'
    titulo.textContent = 'Cadastrar Produto'
    formulario.append(titulo)

    // Agrupamento do ID
    const grupoId = document.createElement('div')
    grupoId.className = 'mb-3'
    const labelId = document.createElement('label')
    labelId.className = 'form-label'
    labelId.textContent = 'ID (Automático)'
    const id = document.createElement('input')
    id.className = 'form-control'
    id.type = 'number'
    id.disabled = true // Desabilita o ID no cadastro pois ele vai no automatico
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
    nome.placeholder = 'Ex: Celular Motorola'
    grupoNome.append(labelNome, nome)


    
    // Agrupamento do Preço
    const grupoPreco = document.createElement('div')
    grupoPreco.className = 'mb-3'
    const labelPreco = document.createElement('label')
    labelPreco.className = 'form-label'
    labelPreco.textContent = 'Preço (R$): '
    const preco = document.createElement('input')
    preco.className = 'form-control'
    preco.type = 'number'
    preco.placeholder = 'Ex: 2499.90'
    preco.min = '0'        // Impede que o número fique negativo
    preco.step = '0.50'    // Permite que a setinha pule de centavo em centavo
    grupoPreco.append(labelPreco, preco)

    // Agrupamento Estoque
    const grupoEstoque = document.createElement('div')
    grupoEstoque.className = 'mb-3'
    const labelEstoque = document.createElement('label')
    labelEstoque.className = 'form-label'
    labelEstoque.textContent = 'Estoque (Unidades): '
    const estoque = document.createElement('input')
    estoque.className = 'form-control'
    estoque.type = 'number'
    estoque.placeholder = 'Ex: 50'
    estoque.min = '0'     
    estoque.step = '1'   
    grupoEstoque.append(labelEstoque, estoque)


    // Agrupamento da Descrição
    const grupoDescricao = document.createElement('div')
    grupoDescricao.className = 'mb-3'
    const labelDescricao = document.createElement('label')
    labelDescricao.className = 'form-label'
    labelDescricao.textContent = 'Descrição: '
    const descricao = document.createElement('textarea')
    descricao.className = 'form-control'
    descricao.placeholder = 'Detalhes do produto'
    descricao.rows = 3
    grupoDescricao.append(labelDescricao, descricao)


    // Agrupamento UploadImagem
    const grupoImagem = document.createElement('div')
    grupoImagem.className = 'mb-4 d-flex flex-column align-items-center'

    const labelImagem = document.createElement('label')
    labelImagem.className = 'form-label align-self-start'
    labelImagem.textContent = 'Foto do Produto'

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
    
    // Imagem padrão
    const imagemInicial = 'https://placehold.co/200x200/e9ecef/495057?text=Sem+Foto'
    imagemPreview.src = imagemInicial
    grupoImagem.append(labelImagem, inputImagem, imagemPreview)


    // Grupo de botões
    const grupoBotoes = document.createElement('div')
    grupoBotoes.className = 'd-flex gap-3 mt-4'

    // Botão limpar campos
    const btnLimpar = document.createElement('button')
    btnLimpar.className = 'btn btn-outline-secondary w-50'
    btnLimpar.type = 'button'
    btnLimpar.textContent = 'Limpar'
    btnLimpar.onclick = () => limparCampos(id, nome, descricao, preco, estoque, inputImagem, imagemPreview)


    // Botão salvar
    const btnSalvar = document.createElement('button')
    btnSalvar.className = 'btn btn-primary w-50'
    btnSalvar.type = 'button'
    btnSalvar.textContent = 'Salvar'
    btnSalvar.onclick = () => salvarProduto(id, nome, descricao, preco, estoque, inputImagem, imagemPreview)

    grupoBotoes.append(btnLimpar, btnSalvar)

    formulario.append(grupoId, grupoNome, grupoDescricao, grupoPreco, grupoEstoque, grupoImagem, grupoBotoes)

    return formulario
}

