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

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {board.title}
                </Card.Title>
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