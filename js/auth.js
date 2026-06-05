const BASE_URL = "https://base-back-dwpz.onrender.com"

export async function cadastrar(nome, email, senha, papel = "administrador") {
  const response = await fetch(`${BASE_URL}/cadastrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha, papel })
  })
  if (!response.ok) throw new Error("Erro ao cadastrar")
  return response.json()
}

export async function entrar(email, senha) {
  const response = await fetch(`${BASE_URL}/entrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  })
  if (!response.ok) throw new Error("Email ou senha inválidos")
  const data = await response.json()

  // A API retorna "accessToken", não "token"
  localStorage.setItem("token", data.accessToken)
  return data
}

export function getToken() {
  return localStorage.getItem("token")
}

export function logout() {
  localStorage.removeItem("token")
}