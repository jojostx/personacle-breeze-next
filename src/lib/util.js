const range = (start, end, step) => {
    let arr = []
    for (let i = start; i <= end; i += step) {
        arr.push(i)
    }
    return arr
}

export { range }