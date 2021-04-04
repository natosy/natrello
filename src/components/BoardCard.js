import { useContext } from 'react'
import { Col, Card, Button, Accordion, AccordionContext, useAccordionToggle } from 'react-bootstrap'
import Board from './Board'

/**
 * Board Toggle for Accordion which changes text on the button based on whether it is toggled or not.
 */
const BoardToggle = ({ children, eventKey, callback }) => {
    const currentEventKey = useContext(AccordionContext)

    const changeOnClick = useAccordionToggle(
        eventKey,
        () => callback && callback(eventKey))

    const isCurrentEventKey = currentEventKey == eventKey

    return (
        <button type='button' onClick={changeOnClick}>
            {isCurrentEventKey ? 'Close Board' : 'Open Board'}
        </button>
    )
}

/**
 * Board Card which shows the board's title, description, and board (when toggled to open)
 */
const BoardCard = ({ boardData }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {boardData.title}
                </Card.Title>
                <Card.Text>
                    {boardData.description}
                </Card.Text>
                <BoardToggle eventKey={boardData.id.toString()} />
                <Accordion.Collapse eventKey={boardData.id.toString()}>
                    <Board lists={boardData.lists} />
                </Accordion.Collapse>
            </Card.Body>
        </Card>
    )
}

export default BoardCard