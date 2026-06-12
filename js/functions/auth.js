const BASE_URL = "https://base-back-dwpz.onrender.com"

const ADMIN_EMAIL = "teste2@email.com"
const ADMIN_SENHA = "senha123"

async function entrar() {
  const response = await fetch(`${BASE_URL}/entrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: ADMIN_EMAIL, senha: ADMIN_SENHA })
  })
  if (!response.ok) return false
  const data = await response.json()
  localStorage.setItem("token", data.accessToken)
  return true
}

async function cadastrarEEntrar() {
  await fetch(`${BASE_URL}/cadastrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome: "Admin", email: ADMIN_EMAIL, senha: ADMIN_SENHA, papel: "administrador" })
  })
  await entrar()
}

export function getToken() {
  return localStorage.getItem("token")
}

export function logout() {
  localStorage.removeItem("token")
}

// Sempre limpa o token antigo e faz login do zero
export async function garantirLogin() {
  localStorage.removeItem("token")

  const logou = await entrar()
  if (!logou) {
    await cadastrarEEntrar()
  }
}
