import { Tree } from "./Tree.js";
import "./styles.css";

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
  buildTree(array) {
    array = this.removeDuplicates(array);
    array = this.sortArray(array);
    console.log("Array de entrada sin duplicados y ordenado: ", array);
    const testTree = new Tree(array);
    const root = testTree.buildTree(array, 0, array.length - 1);
    testTree.setRoot(root);
    this.tree = testTree;
    return root;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
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

  insert(value) {
    this.tree.insert(value);
    this.prettyPrint(this.tree.getRoot());
  }

  find(value) {
    let resNode = this.tree.find(value);
    console.log(resNode);
    return resNode;
  }

  delete(value) {
    let actualRoot = this.tree.getRoot();
    this.tree.deleteItem(value);
    if (this.tree.getRoot() !== actualRoot) {
      this.tree.setRoot(this.tree.getRoot());
    }
  }

  levelOrderForEach(callback) {
    this.tree.levelOrderForEach(callback);
  }

  preOrderForEach(callback) {
    this.tree.preOrderForEach(callback);
  }

  inOrderForEach(callback) {
    this.tree.inOrderForEach(callback);
  }

  postOrderForEach(callback) {
    this.tree.postOrderForEach(callback);
  }
}
let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const controller = new Controller();
const rootRes = controller.buildTree(testArray);
controller.prettyPrint(rootRes);

// Inserciones múltiples
controller.insert(2);
// controller.insert(10);
// controller.insert(100);
controller.insert(10000);

//Búsqueda de valores particulares en el BST.
// controller.find(8);
// controller.find(5);
// controller.find(4);
// controller.find(10);

controller.find(7);

//Eliminaciones múltiples (nodos hojas).
controller.delete(7);
let rootNode = controller.tree.getRoot();
console.log(rootNode);
controller.prettyPrint(rootNode);
controller.delete(2);
controller.prettyPrint(rootNode);

//Eliminación de nodos con un hijo.
controller.delete(1);
controller.prettyPrint(rootNode);
// controller.delete(9);
// controller.prettyPrint(rootNode);
// controller.delete(6345);
// controller.prettyPrint(rootNode);

//Eliminación de nodos con dos hijos.
// controller.delete(67);
// controller.prettyPrint(rootNode);
controller.delete(8);

console.log(rootNode);
controller.prettyPrint(rootNode);

let rootNode2 = controller.tree.getRoot();
console.log(rootNode2);
controller.prettyPrint(rootNode2);

//Recorrido breadth-first
function printNode(Node) {
  console.log("Node number: " + `${Node.data}`);
}
console.log("Recorrido breadth-first");
controller.levelOrderForEach(printNode);
console.log("Recorrido Pre Order");
controller.preOrderForEach(printNode);
console.log("Recorrido In Order");
controller.prettyPrint(rootNode2);
controller.inOrderForEach(printNode);
console.log("Recorrido Post Order");
controller.prettyPrint(rootNode2);
controller.postOrderForEach(printNode);
