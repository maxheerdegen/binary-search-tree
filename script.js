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
            console.log("right");
        } else {
            previous.left = insertNode;
            console.log("left");
        }
    }
    
    return { root, insert };
}