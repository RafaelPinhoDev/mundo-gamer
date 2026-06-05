'use strict'

import { getProdutos, deletarProduto } from "../functions/produtos.js"

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
function editarProduto(id) {
    alert(`Em breve: A tela de edição do ID ${id} será aberta aqui!`)
}



