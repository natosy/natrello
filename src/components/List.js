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
        const boardId = localStorage.getItem('activeKey')

        // get current list of items and remove dropped item
        var listItems = boardData[boardId].lists[listId].listItems
        listItems = listItems.filter((item) => item.uniqueId !== droppedItem.uniqueId)

        // replace list after dropping item 
        boardData[boardId].lists[listId].listItems = listItems
        setBoardData(boardData)
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
                <AddListItemForm boardId={boardId} list={list} setBoardData={setBoardData} />
            </Row>
        </Col>
    )
}

export default List