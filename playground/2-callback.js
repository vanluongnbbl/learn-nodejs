
const add = (firstNum, secondNum, callback) => {
    const sum = firstNum + secondNum

    setTimeout(() => {
        callback(sum)
    }, 0);
}

const callback = (sum) => {
    return sum
}


console.log('add(1, 4)', add(1, 4, callback))