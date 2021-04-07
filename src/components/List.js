import { Droppable } from 'react-beautiful-dnd'
import { Col, Row } from 'react-bootstrap'
import EdiText from 'react-editext'


import {
    saveBoard, getBoardDataAfterRemoveItem, 
    // getBoardDataAfterAddItem, hasReachedListLimit, 
    getBoardDataAfterEditItem, getBoardAfterEditListCapacity,
    getBoardAfterEditListTitle
} from '../util/Util'
import AddListItemForm from './AddListItemForm'
import ListItem from './ListItem'

const List = ({ list, boardId, setBoardData }) => {

    // const onDragOver = (e) => {
    //     e.preventDefault()
    // }
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
        <Col className='list' 
        // onDragOver={onDragOver} onDrop={() => onDrop(list.listId)}
        >

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
            <Droppable droppableId={list.listId.toString()}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {list.listItems.map((item, index) => (
                            <ListItem key={item.uniqueId} index={index} item={item} 
                            handleDeleteItem={handleDeleteItem} handleEditItem={handleEditItem} />
                        ))}
                    {provided.placeholder}
                    <AddListItemForm boardId={boardId} listId={list.listId} setBoardData={setBoardData} />
                    </div>
                )}
            </Droppable>
        </Col>
    )
}

export default List