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