const ListItem = (props) => {

    const onDragStart = (e) => {
        console.log(props)
        console.log(e.target.id)
        localStorage.setItem('dragItem', JSON.stringify(props))
    }
    const onDragOver = (e) => {
        e.preventDefault()
    }

    const onDrop = (e) => {

        const droppedItem = JSON.parse(localStorage.getItem('dragItem'))
        const listId = droppedItem.listId
        const newListId = props.listId

        // don't do anything if drag and drop is on same list (otherwise will have annoying effect of adding again to the back of the list)
        if (listId === newListId) return 

        const boardData = JSON.parse(localStorage.getItem('boards'))
        const boardId = localStorage.getItem('activeKey')

        // get current list of items and remove dropped item
        var listItems = boardData[boardId].lists[listId].listItems
        listItems = listItems.filter((item) => item.uniqueId !== droppedItem.uniqueId)

        // replace list after dropping item 
        boardData[boardId].lists[listId].listItems = listItems
        props.setBoardData(boardData)
        console.log(boardData)

        // update item with new list id
        console.log(droppedItem)
        droppedItem.listId = newListId

        // add updated item into new list
        boardData[boardId].lists[newListId].listItems.push(droppedItem)

        // save deletion and addition into localstorage
        localStorage.setItem('boards', JSON.stringify(boardData))
    }

    return (
        <div draggable='true' onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} id={props.listId}>{props.description}</div>
    )
}

export default ListItem