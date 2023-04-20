
function getIndices(arr, target) {
    let indices = {};
    for(let i = 0; i < arr.length; i++) {
        const complement = target - arr[i];
        if(complement in indices) {
            return [indices[complement], i];
        }
        indices[arr[i]] = i;
    }
    return []
}

const arr = [1, 3, 5, 8, 9];
const target = 8;

console.log(getIndices(arr, target))