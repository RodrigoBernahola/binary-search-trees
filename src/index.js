import "./styles.css";

// Función de ejemplo
const saludar = (nombre) => {
  console.log(`¡Hola, ${nombre}!`);
  return `¡Hola, ${nombre}!`;
};

// Código principal
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  if (app) {
    app.innerHTML = "<h1>Mi aplicación con ESLint y Prettier</h1>";
    saludar("Mundo");
  }
});

export { saludar };
