import { Node } from "./Node.js";

export class Tree {
  constructor(array) {
    this.array = array;
    this.root = null;
  }

  getRoot() {
    return this.root;
  }

  setRoot(node) {
    this.root = node;
  }

  buildTree(array, start, end) {
    if (start > end) return null;
    let mid = Math.floor((start + end) / 2);
    let root = new Node(array[mid]);
    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);
    return root;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }
    this._insertRecursive(this.root, value);
  }

  _insertRecursive(node, value) {
    if (value < node.data) {
      if (node.left === null) {
        node.left = new Node(value);
      } else {
        this._insertRecursive(node.left, value);
      }
    } else if (value > node.data) {
      if (node.right === null) {
        node.right = new Node(value);
      } else {
        this._insertRecursive(node.right, value);
      }
    }
  }

  find(value) {
    if (this.root === null) {
      return null;
    }

    let currentNode = this.root;

    while (currentNode !== null) {
      if (currentNode.data === value) {
        return currentNode;
      } else if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  removeLeafNode(leafNode) {
    let value = leafNode.data;
    let currentNode = this.root;
    while (currentNode !== null) {
      if (value < currentNode.data) {
        if (currentNode.left === leafNode) {
          currentNode.left = null;
          return;
        } else {
          currentNode = currentNode.left;
        }
      } else if (value > currentNode.data) {
        if (currentNode.right === leafNode) {
          currentNode.right = null;
          return;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }

  removeNodeWithOneChild(NodeWithOneChild) {
    let value = NodeWithOneChild.data;
    let parentNode = this.root;
    let tempChildNode;
    let currentNode = this.root;

    while (currentNode !== null) {
      if (value < currentNode.data) {
        if (currentNode === NodeWithOneChild) {
          tempChildNode = currentNode.right || currentNode.left;
          console.log(tempChildNode);
          parentNode.left = tempChildNode;
        } else {
          parentNode = currentNode;
          currentNode = currentNode.left;
        }
      } else if (value > currentNode.data) {
        if (currentNode === NodeWithOneChild) {
          tempChildNode = currentNode.right || currentNode.left;
          parentNode.right = tempChildNode;
        } else {
          parentNode = currentNode;
          currentNode = currentNode.right;
        }
      }
    }
  }

  deleteItem(value) {
    let numberOfChilds = 0;
    let searchedValueNode = this.find(value);
    if (searchedValueNode === null) {
      console.log("Item not found");
      return;
    }

    if (searchedValueNode.left !== null) numberOfChilds++;
    if (searchedValueNode.right !== null) numberOfChilds++;

    switch (numberOfChilds) {
      case 0:
        console.log("Leaf node");
        this.removeLeafNode(searchedValueNode);
        break;
      case 1:
        console.log("One child");
        this.removeNodeWithOneChild(searchedValueNode);
        break;
      case 2:
        console.log("Two childs");
        break;
    }
  }
}
