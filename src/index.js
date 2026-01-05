import { Tree } from "./Tree.js";
class Controller {
  constructor() {
    this.tree = null;
  }

  removeDuplicates(array) {
    return [...new Set(array)];
  }

  sortArray(array) {
    return array.sort((a, b) => a - b);
  }

  createRandomArray(size = 15) {
    let array = [];
    for (let i = 0; i < size; i++) {
      array.push(Math.floor(Math.random() * 100));
    }
    return array;
  }

  printTraversal(traversalMethodName) {
    let result = [];
    const callback = (node) => result.push(node.data);

    this.tree[traversalMethodName](callback);

    console.log(`${traversalMethodName}: [ ${result.join(", ")} ]`);
  }

  buildTree(array) {
    array = this.removeDuplicates(array);
    array = this.sortArray(array);
    const testTree = new Tree(array);
    const root = testTree.buildTree(array, 0, array.length - 1);
    testTree.setRoot(root);
    this.tree = testTree;
    return root;
  }

  prettyPrint(node = this.tree.getRoot(), prefix = "", isLeft = true) {
    if (node === null) return;
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  // --- EL SCRIPT "TIE IT ALL TOGETHER" ---

  runDriverScript() {
    console.log("--- 1. Creando árbol con números aleatorios < 100 ---");
    const randomArray = this.createRandomArray(20);
    console.log("Input Array:", randomArray);
    this.buildTree(randomArray);
    this.prettyPrint();

    console.log("\n--- 2. Confirmando si está balanceado ---");
    console.log("¿Está balanceado?:", this.tree.isBalanced() ? "SÍ" : "NO");

    console.log(
      "\n--- 3. Imprimiendo elementos (Level, Pre, Post, In Order) ---",
    );
    this.printTraversal("levelOrderForEach");
    this.printTraversal("preOrderForEach");
    this.printTraversal("postOrderForEach");
    this.printTraversal("inOrderForEach");

    console.log(
      "\n--- 4. Desbalanceando el árbol (Insertando números > 100) ---",
    );
    [101, 150, 200, 250, 300].forEach((num) => {
      console.log(`Insertando ${num}...`);
      this.tree.insert(num);
    });
    this.prettyPrint();

    console.log("\n--- 5. Confirmando si está desbalanceado ---");
    console.log("¿Está balanceado?:", this.tree.isBalanced() ? "SÍ" : "NO");

    console.log("\n--- 6. Rebalanceando el árbol ---");
    this.tree.rebalance();
    this.prettyPrint();

    console.log("\n--- 7. Confirmando si está balanceado tras rebalancear ---");
    console.log("¿Está balanceado?:", this.tree.isBalanced() ? "SÍ" : "NO");

    console.log("\n--- 8. Imprimiendo elementos finales ---");
    this.printTraversal("levelOrderForEach");
    this.printTraversal("preOrderForEach");
    this.printTraversal("postOrderForEach");
    this.printTraversal("inOrderForEach");
  }
}

// Ejecución
const controller = new Controller();
controller.runDriverScript();
