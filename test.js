function nthPower(arr, n) {
    // Return an array containing all indices that are powers of n
    // Your code here
    if (n == 0) return arr;
    let powers = [];

    for (let i = 0; i < arr.length; i++) {
        const log = Math.log(i) / Math.log(n);
        //console.log(i, log, Math.round(log) === log);
        if (i == 1) {
            powers.push(arr[i]);
            continue;
        }
        let j = i;
        while (j % n === 0 && j >= n) {
            console.log(i, j);
            j /= n;
            if (j === 1) powers.push(arr[i]);
        }
        /*if(Math.pow(i,n) % 2 === 0){
            powers.push(arr[i])
        }*/
    }
    return powers;
}

console.log(nthPower([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2));
