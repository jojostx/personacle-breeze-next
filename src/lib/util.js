const range = (start, end, step, fromRight = false) => {
    let arr = []
    
    for (let i = start; i <= end; i += step) {
        arr.push(i)
    }

    if (fromRight) {
        arr.reverse()
    }

    return arr
}

const getStringValue = (color) => {
    if (!color) return

    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
}

export { range, getStringValue }
