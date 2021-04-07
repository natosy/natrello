import { Col, Row, Card } from 'react-bootstrap'
import AddListForm from './AddListForm'
import { DragDropContext } from 'react-beautiful-dnd'
import List from './List'
import { hasReachedListLimit, getBoardDataAfterAddItem, getBoardDataAfterRemoveItem, getListItem, saveBoard } from '../util/Util'

const Board = ({ lists, boardId, setBoardData }) => {


    /**
     draggable returns object with format of draggable id and index
     object
     {draggableId = list item unique id}
     {droppableId = list id}
     {index: }
     need to find a way to apply change in index 
     */

    // no need for ondrag start as both source and destination are viewable from on drag end 
    const onDragEnd = (e) => {

        // prevent dragging if capacity is filled or if dragging to nowhere
        if (!e.destination ||
            hasReachedListLimit(boardId, parseInt(e.destination.droppableId))
        )
            return;

        const destinationListId = parseInt(e.destination.droppableId)
        const destinationListItemIndex = parseInt(e.destination.index)



        // get item that is being dragged over
        const draggedListItem = getListItem(
            boardId,
            parseInt(e.source.droppableId),
            parseInt(e.draggableId))

        saveBoard(getBoardDataAfterRemoveItem(boardId, parseInt(e.source.droppableId), parseInt(e.draggableId)), setBoardData)

        // update dragged list item with the new list number
        draggedListItem.listId = destinationListId;

        saveBoard(
            getBoardDataAfterAddItem(boardId, destinationListId, destinationListItemIndex, draggedListItem),
            setBoardData)

        console.log(draggedListItem)
    }


    // const onDrop = (newListId) => {
    //     const draggedItem = JSON.parse(localStorage.getItem('dragItem'))
    //     const listId = draggedItem.listId
    //     // don't do anything if drag and drop is on same list (otherwise will have annoying effect of adding again to the back of the list)
    //     if (listId === newListId) return

    //     
    //     // delete from board, set state and save to local storage
    //     saveBoard(
    //         getBoardDataAfterRemoveItem(boardId, listId, draggedItem.uniqueId),
    //         setBoardData)

    //     // update item with new list id
    //     draggedItem.listId = newListId

    //     // add to board, set state and save to localstorage
    //     saveBoard(
    //         getBoardDataAfterAddItem(boardId, newListId, draggedItem),
    //         setBoardData)
    // }

    return (
        <Card.Body>
            <DragDropContext
                // onDragStart={e => onDragStart(e)}
                onDragEnd={e => onDragEnd(e)}>
                <Row>
                    {lists.map((item, index) => {
                        return <Col className='list-wrapper' xs={12} sm={6} md={4} lg={4} key={item.listId}>
                            <List list={item} boardId={boardId} setBoardData={setBoardData} />
                        </Col>
                    })}
                    <Col>
                        <AddListForm boardId={boardId} setBoardData={setBoardData} />
                    </Col>
                </Row>
            </DragDropContext>
        </Card.Body>
    )
}

export default Board