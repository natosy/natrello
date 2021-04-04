const largestBoardId = (boards) => {
    const largest = (max, curr) => curr.id > max ? curr.id : max;
    return boards.reduce(largest, 0)
}

export default { largestBoardId }