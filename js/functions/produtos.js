import { getToken, garantirLogin } from "./auth.js"

const BASE_URL = "https://base-back-dwpz.onrender.com/produtos"

async function headersAutenticados() {
  await garantirLogin()
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}`
  }
}

export async function getProdutos() {
  const response = await fetch(BASE_URL)
  if (!response.ok) throw new Error("Erro ao buscar produtos")
  return response.json()
}

export async function criarProduto(produto) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: await headersAutenticados(),
    body: JSON.stringify(produto)
  })
  if (!response.ok) throw new Error("Erro ao criar produto")
  return response.json()
}

export async function atualizarProduto(id, produto) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: await headersAutenticados(),
    body: JSON.stringify(produto)
  })
  if (!response.ok) throw new Error("Erro ao atualizar produto")
  return response.json()
}

export async function deletarProduto(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: await headersAutenticados()
  })
  if (!response.ok) throw new Error("Erro ao deletar produto")
  return true
}
