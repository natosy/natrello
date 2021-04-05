import { Col, Row } from 'react-bootstrap'
import EdiText from 'react-editext'

import { saveBoard, getBoardDataAfterRemoveItem, getBoardDataAfterAddItem, hasReachedListLimit, getBoardDataAfterEditItem, getBoardWithChangedListCapacity } from '../util/Util'
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

    // can abstract this into another function as onDrop also requires this functionality
    const handleDeleteItem = (listId, uniqueId) => {
        saveBoard(
            getBoardDataAfterRemoveItem(boardId, listId, uniqueId),
            setBoardData)
    }

    const handleEditItem = (itemUniqueId, e) => {
        saveBoard(
            getBoardDataAfterEditItem(boardId, list.listId, itemUniqueId, e),
            setBoardData
        )

        console.log(e, itemUniqueId)
    }

    const size = list.listItems.length
    const capacity = list.listCapacity

    // ensure that capacity doesnt go below current capacity
    const handleListCapacityChange = (capacity) => {
        saveBoard(
            getBoardWithChangedListCapacity(boardId, list.listId, capacity), setBoardData
        )
    }
    return (
        <Col onDragOver={onDragOver} onDrop={() => onDrop(list.listId)} xs={12} sm={6} md={4} lg={3}>
            <Row>
                <h6>
                    {list.listTitle}
                </h6>
                <h6>
                    {size}/
                </h6>
                <h6>
                    <EdiText
                        startEditingOnFocus
                        cancelOnUnfocus
                        submitOnEnter
                        cancelOnEscape
                        editButtonClassName='edit-buttons'
                        type='number'
                        // saveButtonClassName='edit-buttons'
                        // cancelButtonClassName='edit-buttons'
                        validation={(e) => parseInt(e) >= size}
                        value={capacity.toString()}
                        onSave={(e) => handleListCapacityChange(e)}
                        editOnViewClick={true}
                    />
                </h6>
            </Row>
            {list.listItems.map((item, index) => {
                return <ListItem key={index} item={item} onDragOver={onDragOver} onDrop={onDrop} handleDeleteItem={handleDeleteItem} handleEditItem={handleEditItem} />
            })}
            <Row>
                <AddListItemForm boardId={boardId} listId={list.listId} setBoardData={setBoardData} />
            </Row>
        </Col>
    )
}

export default List