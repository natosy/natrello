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

    }


    return (
        <Card.Body>
            <DragDropContext
                onDragEnd={e => onDragEnd(e)}>
                <Row>
                    {lists.map((item, index) => {
                        return <Col xs={12} sm={6} md={6} lg={6} key={item.listId}>
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