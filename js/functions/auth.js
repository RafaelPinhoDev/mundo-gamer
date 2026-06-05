const BASE_URL = "https://base-back-dwpz.onrender.com"

const ADMIN_EMAIL = "admin2@email.com"
const ADMIN_SENHA = "123456"

export async function entrar(email, senha) {
  const response = await fetch(`${BASE_URL}/entrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  })
  if (!response.ok) throw new Error("Email ou senha inválidos")
  const data = await response.json()
  localStorage.setItem("token", data.accessToken)
  return data
}

export function getToken() {
  return localStorage.getItem("token")
}

export function logout() {
  localStorage.removeItem("token")
}

export async function garantirLogin() {
  const token = getToken()
  if (!token) {
    await entrar(ADMIN_EMAIL, ADMIN_SENHA)
  }
}