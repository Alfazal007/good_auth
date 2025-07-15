function generateRandomNumber() {
    let length = 6
    let result = ''
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10)
    }
    return result;
}

export {
    generateRandomNumber
}
