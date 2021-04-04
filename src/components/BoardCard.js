import { useContext } from 'react'
import { Card, Accordion, AccordionContext, useAccordionToggle } from 'react-bootstrap'
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

    return (
        <Card>
            <Card.Header>
                <h4>
                    {board.title}
                </h4>
                <button>Edit Board</button>
                <button onClick={handleDeleteBoard}>Delete Board</button>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {board.description}
                </Card.Text>
                <BoardToggle eventKey={board.id.toString()} />
                <Accordion.Collapse eventKey={board.id.toString()}>
                    <Board lists={board.lists} boardId={board.id} setBoardData={setBoardData} />
                </Accordion.Collapse>
            </Card.Body>
        </Card>
    )
}

export default BoardCard