const BASE_URL = "https://base-back-dwpz.onrender.com/produtos"

function getToken() {
  return localStorage.getItem("token")
}

function headersAutenticados() {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}`
  }
}

export async function getProdutos() {
  const response = await fetch(BASE_URL)
  if (!response.ok) {
    throw new Error("Erro ao buscar produtos")
  }
  return response.json()
}

export async function criarProduto(produto) {
  const options = {
    method: "POST",
    headers: headersAutenticados(),
    body: JSON.stringify(produto)
  }

  const response = await fetch(BASE_URL, options)

  if (!response.ok) {
    throw new Error("Erro ao criar produto")
  }

  return response.json()
}

export async function atualizarProduto(id, produto) {
  const options = {
    method: "PUT",
    headers: headersAutenticados(),
    body: JSON.stringify(produto)
  }

  const response = await fetch(`${BASE_URL}/${id}`, options)

  if (!response.ok) {
    throw new Error("Erro ao atualizar produto")
  }

  return response.json()
}

export async function deletarProduto(id) {
  const options = {
    method: "DELETE",
    headers: headersAutenticados()
  }

  const response = await fetch(`${BASE_URL}/${id}`, options)

  if (!response.ok) {
    throw new Error("Erro ao deletar produto")
  }

  return true
}