function getBoardData() {
    return JSON.parse(localStorage.getItem('boards'))
}

function getListItem(boardId, listId, uniqueId) {
    const boardData = getBoardData()
    const boardIndex = getBoardIndex(boardId)
    const listIndex = getListIndex(boardId, listId)
    // console.log('board index', boardIndex) 
    // console.log('list id', listId)
    // console.log('listindex', listIndex)
    const itemIndex = boardData[boardIndex].lists[listIndex].listItems.findIndex(i => i.uniqueId === uniqueId);
    return boardData[boardIndex].lists[listIndex].listItems[itemIndex];
}


function getBoardIndex(boardId) {
    const boardData = getBoardData()
    return boardData.findIndex(b => b.id === boardId)
}

function getListIndex(boardId, listId) {
    const boardData = getBoardData()
    const boardIndex = getBoardIndex(boardId)
    return boardData[boardIndex].lists.findIndex(l => l.listId === listId)
}

function saveBoard(updatedBoard, setBoardData) {
    localStorage.setItem('boards', JSON.stringify(updatedBoard))
    setBoardData(updatedBoard)
}

function getBoardDataAfterRemoveItem(boardId, listId, uniqueId) {
    const boardData = getBoardData()
    const boardIndex = getBoardIndex(boardId)
    const listIndex = getListIndex(boardId, listId)
    const newListItems = boardData[boardIndex].lists[listIndex].listItems.filter((item) => item.uniqueId !== uniqueId)
    boardData[boardIndex].lists[listIndex].listItems = newListItems
    console.log('deleted item with uniqueId', uniqueId)
    return boardData
}

// need to have index to include splicing 
function getBoardDataAfterAddItem(boardId, listId, newIndex, item) {
    const boardData = getBoardData()
    const boardIndex = getBoardIndex(boardId)
    const listIndex = getListIndex(boardId, listId)

    if (newIndex === -1 || newIndex === null) {
        boardData[boardIndex].lists[listIndex].listItems.push(item)
        console.log('added item with uniqueId', item.uniqueId)
    } else {
        boardData[boardIndex].lists[listIndex].listItems.splice(newIndex, 0, item)
        console.log('moved item with uniqueId', item.uniqueId)
    }
    return boardData

}

function getBoardDataAfterEditBoard(boardId, title, description) {
    const boardData = getBoardData()
    const boardIndex = getBoardIndex(boardId)
    const board = boardData[boardIndex]
    boardData[boardIndex] = { ...board, title: title, description: description }
    return boardData
}

function getBoardDataAfterEditItem(boardId, listId, uniqueId, description) {
    const boardData = getBoardData()
    const boardIndex = getBoardIndex(boardId)
    const listIndex = getListIndex(boardId, listId)
    const itemIndex = boardData[boardIndex].lists[listIndex].listItems.findIndex(i => i.uniqueId === uniqueId)

    const item = boardData[boardIndex].lists[listIndex].listItems[itemIndex]

    boardData[boardIndex].lists[listIndex].listItems[itemIndex] = { ...item, description: description }
    return boardData
}

function hasReachedListLimit(boardId, listId) {
    const boardData = getBoardData()
    const boardIndex = getBoardIndex(boardId)
    const listIndex = getListIndex(boardId, listId)
    const list = boardData[boardIndex].lists[listIndex]
    return list.listItems.length >= list.listCapacity
}

function getBoardAfterEditListCapacity(boardId, listId, capacity) {
    const boardData = getBoardData()
    const boardIndex = getBoardIndex(boardId)
    const listIndex = getListIndex(boardId, listId)
    boardData[boardIndex].lists[listIndex].listCapacity = capacity
    return boardData
}

function getBoardAfterEditListTitle(boardId, listId, title) {
    const boardData = getBoardData()
    const boardIndex = getBoardIndex(boardId)
    const listIndex = getListIndex(boardId, listId)
    boardData[boardIndex].lists[listIndex].title = title
    return boardData
}

export {
    getBoardData,
    getBoardIndex,
    saveBoard,
    getBoardDataAfterRemoveItem,
    getBoardDataAfterAddItem,
    hasReachedListLimit,
    getBoardDataAfterEditBoard,
    getBoardDataAfterEditItem,
    getBoardAfterEditListCapacity,
    getBoardAfterEditListTitle,
    getListItem
}