function mergesort (arr) {
    if (arr.length === 1) {
        return arr; 
    }
    let mid = Math.floor(arr.length/2);
    let leftArr = arr.slice(0, mid);
    let rightArr = arr.slice(mid);
    return merge(mergesort(leftArr), mergesort(rightArr));
}

function merge (left, right) {
    sortedArr = [];
    leftIndex = 0;
    rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length ) {
        if (left[leftIndex] < right[rightIndex]) {
            sortedArr.push(left[leftIndex]);
            leftIndex++;
        } else {
            sortedArr.push(right[rightIndex]);
            if (left[leftIndex] === right[rightIndex]){
                leftIndex++;
            }
            rightIndex++;
        }
    }
    sortedArr = sortedArr.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    return sortedArr;
}

const buildTree = (arr) => {
        
    if (arr.length === 0) {
        return null;
    }

    let mid = Math.floor(arr.length/2);
    let leftArr = arr.slice(0, mid);
    let rightArr = arr.slice(mid + 1);
    
    let root = createNode(arr[mid]);
    console.log(leftArr);
    console.log(rightArr);
    
    root.left = buildTree(leftArr);
    root.right = buildTree(rightArr);
    
    return root;
}

function createNode (data, left = null, right = null) {
    return { data, left, right }
}

function createTree (arr) {
    const sortedArr = mergesort(arr);
    

    let root = buildTree(sortedArr);

    const insert = (value) => {
        let current = root;
        let previous;
        let insertNode =  createNode(value);

        while (current) {
            previous = current;
            if (value > current.data) {
                current = current.right;
            } else {
                current = current.left;
            }
        }
        if (value > previous.data) {
            previous.right = insertNode;
        } else {
            previous.left = insertNode;
        }
    }

    const deleteItem = (value) => {
        let current = root;
        let previous;
        let toBeDeleted;
        let direction = ""

        while (current) {
            if (value === current.data) {
                break;
            }
            previous = current;
            if (value > current.data) {
                current = current.right;
                direction = "right";
            }
            if (value < current.data) {
                current = current.left;
                direction = "left";
            }
        }

        if (current.right === null && current.left === null) {
            previous[direction] = null;
        }

        if (current.right !== null && current.left !== null) {
            toBeDeleted = current;
            current = current.right;

            while(current.left) {
                previous = current;
                current = current.left;
            }

            toBeDeleted.data = current.data;

            if (current.right === null) {
                toBeDeleted.right = null;
            }

            if (current.right !== null) {
                previous.left = current.right;
            }
        }

        if (current.right !== null) {
            previous[direction] = current.right;
        }
        if (current.left !== null) {
            previous[direction] = current.left;
        }
    }

    const find = (value) => {
        let current = root;

        while (current && value !== current.data) {
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return current;
    }

    const levelOrder = (callback) => {
        let arr = [root];
        let q;

        while (arr.length) {
            q = arr.length;
            for (let i = 0; i < q; i++) {
                if (arr[i].left !== null) {
                    arr.push(arr[i].left);
                }
                if (arr[i].right !== null) {
                    arr.push(arr[i].right);
                }
                callback(arr[i]);
            }
            for (let i = 0; i < q; i++) {
                arr.shift();
            }
        }
    }

    const preOrder = function (callback, root = this.root) {
        if (root === null) {
            return;
        }
        callback (root.data);
        preOrder (callback, root.left);
        preOrder (callback, root.right);
    }
    
    const inOrder = function (callback, root = this.root) {
        if (root === null) {
            return;
        }
        inOrder(callback, root.left);
        callback(root.data);
        inOrder(callback, root.right);
    }

    const postOrder = function (callback, root = this.root) {
        if (root === null) {
            return;
        }
        postOrder(callback, root.left);
        postOrder(callback, root.right);
        callback(root.data);
    }

    const height = (value) => {
        let start = find(value);
        let q = [start];
        let height = 0;

        while (q.length > 0) {
            let level = q.length;
            for (let i = 0; i < level; i++) {
                let current = q.shift();
                if (current.left !== null) {
                    q.push(current.left);
                }
                if (current.right !== null) {
                    q.push(current.right);
                }
            }   
            height++;
        }
        return height;
    }

    
    const depth = (value) => {
        let current = root;
        let depth = 1;
        while (current && current.data !== value) {
            if (value > current.data) {
                current = current.right;
            }
            if (value < current.data) {
                current = current.left;
            }
            depth++;
        }
        if (current !== null) {
            return depth;
        } else {
            return null;
        }
    }
    
    const totalDepth = function (root = this.root) {
        if (root === null) {
            return 0;
        }
        let leftHeight = totalDepth(root.left);
        let rightHeight = totalDepth(root.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    const isBalanced = function (root = this.root) {
        if (root === null) {
            return true;
        }
        let rightHeight = totalDepth(root.right);
        let leftHeight = totalDepth(root.left);

        let heightDiff = Math.abs(rightHeight - leftHeight);
        if (heightDiff > 1) {
            return false;
        }

        return isBalanced(root.left) && isBalanced(root.right);
    }
    
    
    const rebalance = function () {
        function toArray (number) {
            arr.push(number);
        }
        let arr = [];
        this.inOrder(toArray);
        this.root = buildTree(arr);
    }

    return { root, insert, deleteItem, find, levelOrder, preOrder, inOrder, postOrder, height, depth, isBalanced, rebalance };
}

function print (a) {
    console.log(a);
}