// Armazena token em storage do navegador
export function setItem(key, value) {
  localStorage.setItem(key, value);
}
// Obtém token em storage do navegador
export function getItem(key) {
  return localStorage.getItem(key);
}
// Remove token em storage do navegador
export function removeItem(key) {
  localStorage.removeItem(key);
}
// Limpa token em storage do navegador ***
export function clear() {
  localStorage.clear();
}
