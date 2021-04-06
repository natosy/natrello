import { Col, Row } from 'react-bootstrap'
import EdiText from 'react-editext'


import {
    saveBoard, getBoardDataAfterRemoveItem, getBoardDataAfterAddItem, hasReachedListLimit, getBoardDataAfterEditItem, getBoardAfterEditListCapacity,
    getBoardAfterEditListTitle
} from '../util/Util'
import AddListItemForm from './AddListItemForm'
import ListItem from './ListItem'

const List = ({ list, boardId, setBoardData }) => {

    const onDragOver = (e) => {
        e.preventDefault()
    }

    const onDrop = (newListId) => {
        const draggedItem = JSON.parse(localStorage.getItem('dragItem'))
        const listId = draggedItem.listId
        // don't do anything if drag and drop is on same list (otherwise will have annoying effect of adding again to the back of the list)
        if (listId === newListId) return

        // prevent dragging if capacity is filled
        if (hasReachedListLimit(boardId, newListId)) {
            console.log('reached list limit and cannot move item')
            return
        }
        // delete from board, set state and save to local storage
        saveBoard(
            getBoardDataAfterRemoveItem(boardId, listId, draggedItem.uniqueId),
            setBoardData)

        // update item with new list id
        draggedItem.listId = newListId

        // add to board, set state and save to localstorage
        saveBoard(
            getBoardDataAfterAddItem(boardId, newListId, draggedItem),
            setBoardData)
    }

    const handleDeleteItem = (listId, uniqueId) => {
        saveBoard(
            getBoardDataAfterRemoveItem(boardId, listId, uniqueId),
            setBoardData)
    }

    const handleEditItem = (itemUniqueId, description) => {
        saveBoard(
            getBoardDataAfterEditItem(boardId, list.listId, itemUniqueId, description),
            setBoardData
        )
    }

    const size = list.listItems.length
    const capacity = list.listCapacity

    // ensure that capacity doesnt go below current capacity
    const handleListCapacityChange = (capacity) => {
        saveBoard(
            getBoardAfterEditListCapacity(boardId, list.listId, capacity), setBoardData
        )
    }

    const handleListTitleChange = (title) => {
        saveBoard(
            getBoardAfterEditListTitle(boardId, list.listId, title), setBoardData
        )
    }
    return (
        <Col className='list' onDragOver={onDragOver} onDrop={() => onDrop(list.listId)}>
            <Row className='list-title'>
                <Col>
                    <EdiText
                        startEditingOnFocus
                        cancelOnUnfocus
                        submitOnEnter
                        cancelOnEscape
                        editButtonClassName='edit-button'
                        saveButtonClassName='edit-button'
                        cancelButtonClassName='edit-button'
                        validation={(e) => e.length > 0}
                        value={list.listTitle}
                        onSave={(e) => handleListTitleChange(e)}
                        editOnViewClick={true}
                    />
                </Col>
                <Col className='list-stat'>
                    {size}/
                    <EdiText className='edit-view'
                        startEditingOnFocus
                        cancelOnUnfocus
                        submitOnEnter
                        cancelOnEscape
                        viewContainerClassName='edit-view'
                        editButtonClassName='edit-button'
                        type='number'
                        saveButtonClassName='edit-button'
                        cancelButtonClassName='edit-button'
                        validation={(e) => parseInt(e) >= size}
                        value={capacity.toString()}
                        onSave={(e) => handleListCapacityChange(e)}
                        editOnViewClick={true}
                    />
                </Col>
            </Row>
            {list.listItems.map((item, index) => {
                return <ListItem key={index} item={item} onDragOver={onDragOver} onDrop={onDrop} handleDeleteItem={handleDeleteItem} handleEditItem={handleEditItem} />
            })}
            <AddListItemForm boardId={boardId} listId={list.listId} setBoardData={setBoardData} />
        </Col>
    )
}

export default List