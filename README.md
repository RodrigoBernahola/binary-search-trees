# Binary Search Tree (BST) Implementation

Una implementación completa y visual de un Árbol Binario de Búsqueda (BST) balanceado en JavaScript, desarrollada como parte del currículo de The Odin Project.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Webpack](https://img.shields.io/badge/Webpack-5.0+-8DD6F9?logo=webpack&logoColor=black)

## 📋 Descripción

Este proyecto implementa una estructura de datos de árbol binario que se auto-balancea (o ofrece métodos para rebalancear). Incluye una visualización en consola para entender la estructura del árbol y algoritmos de recorrido (traversal) tanto en profundidad como en anchura.

### Características Principales

- **Creación de Árbol Balanceado:** Convierte un array de datos desordenado en un BST balanceado.
- **Operaciones CRUD:** Inserción y eliminación de nodos manteniendo la integridad del árbol.
- **Traversals (Recorridos):**
  - Breadth-First: `levelOrder`
  - Depth-First: `preOrder`, `inOrder`, `postOrder`
- **Utilidades:** Cálculo de altura (`height`), profundidad (`depth`) y verificación de balance (`isBalanced`).
- **Rebalanceo:** Algoritmo para reestructurar un árbol desbalanceado.

## 🚀 Instalación y Uso

1.  **Clonar el repositorio:**

    ```bash
    git clone [https://github.com/rodrigobernahola/binary-search-trees.git](https://github.com/rodrigobernahola/binary-search-trees.git)
    cd binary-search-trees
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Ejecutar en modo desarrollo:**
    ```bash
    npm start
    ```
    Esto ejecutará el script principal y mostrará la salida en la consola del navegador o terminal (dependiendo de tu configuración de webpack dev server).

## 🛠️ Tecnologías

- **Lenguaje:** JavaScript (ES6 Modules)
- **Empaquetador:** Webpack
- **Linting/Formatting:** ESLint, Prettier

## ✒️ Autor

- **Rodrigo Bernahola** - [Perfil de GitHub](https://github.com/rodrigobernahola)

---

_Proyecto creado para [The Odin Project](https://www.theodinproject.com/)_
