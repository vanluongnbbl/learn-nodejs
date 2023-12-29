const calculateTip = (total, percent = .25) => {
    const tip = total * percent
    return tip + total
}

module.exports = {
    calculateTip
}