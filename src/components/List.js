import { Col, Row } from 'react-bootstrap'
import AddListItemForm from './AddListItemForm'

import ListItem from './ListItem'

const List = ({ list, boardId, setBoardData }) => {

    const onDragOver = (e) => {
        e.preventDefault()
    }

    const onDrop = (newListId) => {
        const droppedItem = JSON.parse(localStorage.getItem('dragItem'))
        const listId = droppedItem.listId

        // don't do anything if drag and drop is on same list (otherwise will have annoying effect of adding again to the back of the list)
        if (listId === newListId) return

        const boardData = JSON.parse(localStorage.getItem('boards'))
        const currentBoardId = boardData.findIndex(b => b.id == boardId)
        console.log(boardId)
        const actualListId = boardData[currentBoardId].lists.findIndex(l => l.listId === listId)

        // get current list of items and remove dropped item
        var listItems = boardData[currentBoardId].lists[actualListId].listItems
        listItems = listItems.filter((item) => item.uniqueId !== droppedItem.uniqueId)

        // replace list after deleting item 
        boardData[currentBoardId].lists[actualListId].listItems = listItems
        setBoardData(boardData)
        console.log(boardData)

        // update item with new list id
        console.log(droppedItem)
        droppedItem.listId = newListId

        const actualNewListId = boardData[currentBoardId].lists.findIndex(l => l.listId === newListId)

        // add updated item into new list
        boardData[currentBoardId].lists[actualNewListId].listItems.push(droppedItem)

        // save deletion and addition into localstorage
        localStorage.setItem('boards', JSON.stringify(boardData))
    }


    return (
        <Col onDragOver={onDragOver} onDrop={() => onDrop(list.listId)}>
            <Row>
                <h6>
                    {list.listTitle}
                </h6>
            </Row>
            {list.listItems.map((item, index) => {
                return <ListItem key={index} item={item} onDragOver={onDragOver} onDrop={onDrop} />
            })}
            <Row>
                <AddListItemForm boardId={boardId} listId={list.listId} setBoardData={setBoardData} />
            </Row>
        </Col>
    )
}

export default List