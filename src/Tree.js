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
      if (currentNode.data === value) {
        tempChildNode = currentNode.right || currentNode.left;
        if (parentNode.data < value) {
          parentNode.right = tempChildNode;
          return;
        } else {
          parentNode.left = tempChildNode;
          return;
        }
      } else if (value < currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      }
    }
  }

  findSuccesor(NodeWithTwoChildren) {
    let response = NodeWithTwoChildren.right;
    let rightSubTree = NodeWithTwoChildren.right;
    while (rightSubTree !== null) {
      if (rightSubTree.left !== null) {
        response = rightSubTree.left;
        rightSubTree = rightSubTree.left;
        continue;
      }
      break;
    }
    return response;
  }

  getParent(NodeWithTwoChildren) {
    let parentNode = this.root;
    let currentNode = this.root;
    let value = NodeWithTwoChildren.data;

    while (currentNode !== null) {
      if (currentNode.data === value) {
        return parentNode;
      } else if (value < currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      }
    }
  }

  removeNodeWithTwoChildren(NodeWithTwoChildren) {
    let succesor = this.findSuccesor(NodeWithTwoChildren);
    console.log(succesor);
    let parentNode = this.getParent(NodeWithTwoChildren);
    if (parentNode.right === NodeWithTwoChildren) {
      parentNode.right = succesor;
    } else if (parentNode.left === NodeWithTwoChildren) {
      parentNode.left = succesor;
    } else {
      let rightSubTree = this.getParent(succesor);
      while (rightSubTree.left !== null) {
        if (rightSubTree.left === succesor) {
          rightSubTree.left = succesor.right;
          break;
        }
        rightSubTree = rightSubTree.left;
      }
      this.root = succesor;
      succesor.right = rightSubTree;
    }
    succesor.left = NodeWithTwoChildren.left;
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
        this.removeNodeWithTwoChildren(searchedValueNode);
        break;
    }
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback is required");
    }
    if (this.root === null) {
      throw new Error("Root node is null");
    }

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

  preOrderRecursive(node, callback) {
    if (node === null) return;
    callback(node);
    this.preOrderRecursive(node.left, callback);
    this.preOrderRecursive(node.right, callback);
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback is required");
    }

    if (this.root === null) {
      throw new Error("Root node is null");
    } else {
      this.preOrderRecursive(this.root, callback);
    }
  }

  inOrderRecursive(node, callback) {
    if (node === null) return;
    this.inOrderRecursive(node.left, callback);
    callback(node);
    this.inOrderRecursive(node.right, callback);
  }

  inOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback is required");
    }

    if (this.root === null) {
      throw new Error("Root node is null");
    } else {
      this.inOrderRecursive(this.root, callback);
    }
  }

  postOrderRecursive(node, callback) {
    if (node === null) return;
    this.postOrderRecursive(node.left, callback);
    this.postOrderRecursive(node.right, callback);
    callback(node);
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback is required");
    }
    if (this.root === null) {
      throw new Error("Root node is null");
    } else {
      this.postOrderRecursive(this.root, callback);
    }
  }

  height(value) {
    let searchedNode = this.find(value);

    if (searchedNode === null) {
      return null;
    }

    let leftCount = 0;
    let righCount = 0;
    let currentNode;

    if (searchedNode.left !== null) {
      currentNode = searchedNode.left;
      while (currentNode !== null) {
        leftCount++;
        currentNode = currentNode.left;
      }
    }
    if (searchedNode.right !== null) {
      currentNode = searchedNode.right;
      while (currentNode !== null) {
        righCount++;
        currentNode = currentNode.right;
      }
    }
    let maxHeight = Math.max(leftCount, righCount);
    return maxHeight;
  }

  depthRecursive(node, value, count = 0) {
    if (node === null) return 0;

    if (value < node.data) {
      count += this.depthRecursive(node.left, value, 1);
    } else if (value > node.data) {
      count += this.depthRecursive(node.right, value, 1);
    } else {
      return count++;
    }

    return count;
  }

  depth(value) {
    if (this.root === null) {
      return null;
    }
    if (this.root.data === value) {
      return 0;
    }
    return this.depthRecursive(this.root, value);
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
      return false;
    } else {
      return this.isBalancedRecursive(this.root) > 1;
    }
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
