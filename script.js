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

function createNode (data, left = null, right = null) {
    return { data, left, right }
}

function createTree (arr) {
    const sortedArr = mergesort(arr);
    
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

    const preOrder = (root, callback) => {
        if (root === null) {
            return;
        }
        callback (root.data);
        preOrder (root.left, callback);
        preOrder (root.right, callback);
    }
    
    const inOrder = (root, callback) => {
        if (root === null) {
            return;
        }
        inOrder(root.left, callback);
        callback(root.data);
        inOrder(root.right, callback);
    }

    const postOrder = (root, callback) => {
        if (root === null) {
            return;
        }
        postOrder(root.left, callback);
        postOrder(root.right, callback);
        callback(root.data);
    }

    const height = (value) => {
        let current = root;
        while (current && current.data !== value) {
            if (value < current.data) {
                current = current.left;
            }
            if (value > current.data) {
                current = current.right;
            }
        }
        
    }

    return { root, insert, deleteItem, find, levelOrder, preOrder, inOrder, postOrder };
}

function print (a) {
    console.log(a);
}