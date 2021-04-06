import { useContext } from 'react'
import { Button, Card, Accordion, AccordionContext, useAccordionToggle } from 'react-bootstrap'
import EdiText from 'react-editext'
import { getBoardData, getBoardDataAfterEditBoard, saveBoard } from '../util/Util'
import Board from './Board'

/**
 * Board Toggle for Accordion which changes text on the button based on whether it is toggled or not.
 */
const BoardToggle = ({ children, eventKey, callback }) => {
    const currentEventKey = useContext(AccordionContext)

    const changeOnClick = useAccordionToggle(
        eventKey,
        () => callback && callback(eventKey))

    const isCurrentEventKey = currentEventKey === eventKey

    return (
        <Button variant='outline-dark' type='button' onClick={changeOnClick}>
            {isCurrentEventKey ? 'Close Board' : 'Open Board'}
        </Button>
    )
}

/**
 * Board Card which shows the board's title, description, and board (when toggled to open)
 */
const BoardCard = ({ board, setBoardData }) => {
    const handleDeleteBoard = () => {
        var boardData = getBoardData()
        boardData = boardData.filter((b) => b.id !== board.id)
        saveBoard(boardData, setBoardData)
    }

    const handleBoardEdit = (title, description) => {
        saveBoard(
            getBoardDataAfterEditBoard(board.id, title, description),
            setBoardData
        )
    }

    return (
        <Card>
            <Card.Header>
                <EdiText
                    startEditingOnFocus
                    cancelOnUnfocus
                    submitOnEnter
                    cancelOnEscape
                    viewContainerClassName='view-container'
                    editContainerClassName='edit-container'
                    editButtonClassName='edit-button'
                    saveButtonClassName='edit-button'
                    // saveButtonContent='Save'
                    cancelButtonClassName='edit-button'
                    // cancelButtonContent='Cancel'
                    validation={e => e.length > 0}
                    value={board.title}
                    onSave={(e) => handleBoardEdit(e, board.description)}
                    editOnViewClick={true}
                />
                <Button variant='outline-danger' className='delete-board-button' onClick={handleDeleteBoard}>Delete Board</Button>
            </Card.Header>
            <Card.Body>
                <EdiText
                    startEditingOnFocus
                    cancelOnUnfocus
                    submitOnEnter
                    cancelOnEscape
                    viewContainerClassName='view-container'
                    editButtonClassName='edit-button'
                    saveButtonClassName='edit-button'
                    cancelButtonClassName='edit-button'
                    validation={e => e.length > 0}
                    value={board.description}
                    onSave={(e) => handleBoardEdit(board.title, e)}
                    editOnViewClick={true}
                />
                <BoardToggle eventKey={board.id.toString()} />

                <Accordion.Collapse eventKey={board.id.toString()}>
                    <Board lists={board.lists} boardId={board.id} setBoardData={setBoardData} />
                </Accordion.Collapse>
            </Card.Body>
        </Card>
    )
}

export default BoardCard