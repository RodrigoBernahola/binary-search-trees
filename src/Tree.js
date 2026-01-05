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
    if (!this.isBalanced()) this.rebalance();
  }

  _insertRecursive(node, value) {
    if (value === node.data) {
      return;
    }
    if (value < node.data) {
      if (node.left === null) {
        node.left = new Node(value);
      } else {
        this._insertRecursive(node.left, value);
      }
    } else {
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

  deleteItem(value) {
    this.root = this._deleteNode(this.root, value);
    if (this.root !== null && !this.isBalanced()) {
      this.rebalance();
    }
  }

  _deleteNode(node, value) {
    if (node === null) {
      return null;
    }
    if (value < node.data) {
      node.left = this._deleteNode(node.left, value);
      return node;
    } else if (value > node.data) {
      node.right = this._deleteNode(node.right, value);
      return node;
    }

    if (node.left === null && node.right === null) {
      return null;
    }

    if (node.left === null) {
      return node.right;
    }
    if (node.right === null) {
      return node.left;
    }

    let succesor = this.findMin(node.right);

    node.data = succesor.data;
    node.right = this._deleteNode(node.right, succesor.data);

    return node;
  }

  findMin(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  _validateTraversal(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback is required");
    }
    if (this.root === null) {
      throw new Error("Root node is null");
    }
  }

  levelOrderForEach(callback) {
    this._validateTraversal(callback);
    let queue = [];
    queue.push(this.root);
    while (queue.length !== 0) {
      if (queue[0].left !== null) {
        queue.push(queue[0].left);
      }
      if (queue[0].right !== null) {
        queue.push(queue[0].right);
      }
      callback(queue.shift());
    }
  }

  preOrderForEach(callback) {
    this._validateTraversal(callback);
    this.preOrderRecursive(this.root, callback);
  }

  inOrderForEach(callback) {
    this._validateTraversal(callback);
    this.inOrderRecursive(this.root, callback);
  }

  postOrderForEach(callback) {
    this._validateTraversal(callback);
    this.postOrderRecursive(this.root, callback);
  }

  preOrderRecursive(node, callback) {
    if (node === null) return;
    callback(node);
    this.preOrderRecursive(node.left, callback);
    this.preOrderRecursive(node.right, callback);
  }

  inOrderRecursive(node, callback) {
    if (node === null) return;
    this.inOrderRecursive(node.left, callback);
    callback(node);
    this.inOrderRecursive(node.right, callback);
  }

  postOrderRecursive(node, callback) {
    if (node === null) return;
    this.postOrderRecursive(node.left, callback);
    this.postOrderRecursive(node.right, callback);
    callback(node);
  }

  height(value) {
    let searchedNode = this.find(value);
    if (searchedNode === null) {
      return null;
    }
    return this._heightRecursive(searchedNode);
  }

  _heightRecursive(node) {
    if (node === null) return -1;
    let leftHeight = this._heightRecursive(node.left);
    let rightHeight = this._heightRecursive(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value) {
    if (this.root === null) {
      return null;
    }
    if (this.root.data === value) {
      return 0;
    }
    return this._depthRecursive(this.root, value, 0);
  }

  _depthRecursive(node, value, currentDepth) {
    if (node === null) return null;
    if (value === node.data) {
      return currentDepth;
    }
    if (value < node.data) {
      return this._depthRecursive(node.left, value, currentDepth + 1);
    } else {
      return this._depthRecursive(node.right, value, currentDepth + 1);
    }
  }

  isBalancedRecursive(root) {
    if (root === null) return 0;

    let leftSubTreeHeight = this.isBalancedRecursive(root.left);
    let rightSubTreeHeight = this.isBalancedRecursive(root.right);

    if (
      leftSubTreeHeight === -1 ||
      rightSubTreeHeight === -1 ||
      Math.abs(leftSubTreeHeight - rightSubTreeHeight) > 1
    ) {
      return -1;
    }

    return Math.max(leftSubTreeHeight, rightSubTreeHeight) + 1;
  }

  isBalanced() {
    if (this.root === null) {
      return true;
    }
    return this.isBalancedRecursive(this.root) !== -1;
  }

  rebalance() {
    let newArray = [];
    let callback = function (node) {
      newArray.push(node.data);
    };
    this.inOrderForEach(callback);
    this.root = this.buildTree(newArray, 0, newArray.length - 1);
  }
}
