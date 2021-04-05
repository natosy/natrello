import { useContext } from 'react'
import { Row, Card, Accordion, AccordionContext, useAccordionToggle } from 'react-bootstrap'
import EdiText from 'react-editext'
import { getBoardDataAfterEditBoard, saveBoard } from '../util/Util'
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
        <button type='button' onClick={changeOnClick}>
            {isCurrentEventKey ? 'Close Board' : 'Open Board'}
        </button>
    )
}

/**
 * Board Card which shows the board's title, description, and board (when toggled to open)
 */
const BoardCard = ({ board, setBoardData }) => {
    const handleDeleteBoard = () => {
        var boardData = JSON.parse(localStorage.getItem('boards'))
        boardData = boardData.filter((b) => b.id !== board.id)

        localStorage.setItem('boards', JSON.stringify(boardData))
        setBoardData(boardData)
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
                <Row>
                    <h4>
                        <EdiText
                            startEditingOnFocus
                            cancelOnUnfocus
                            submitOnEnter
                            cancelOnEscape
                            editButtonClassName='edit-buttons'
                            // saveButtonClassName='edit-buttons'
                            // cancelButtonClassName='edit-buttons'
                            validation={e => e.length > 0}
                            value={board.title}
                            onSave={(e) => handleBoardEdit(e, board.description)}
                            editOnViewClick={true}
                        />
                    </h4>
                    <button onClick={handleDeleteBoard}>Delete Board</button>
                </Row>
            </Card.Header>
            <Card.Body>
                <EdiText
                    startEditingOnFocus
                    cancelOnUnfocus
                    submitOnEnter
                    cancelOnEscape
                    editButtonClassName='edit-buttons'
                    // saveButtonClassName='edit-buttons'
                    // cancelButtonClassName='edit-buttons'
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