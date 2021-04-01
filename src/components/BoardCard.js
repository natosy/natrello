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
const BoardCard = ({ boardId }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    Title
                    </Card.Title>
                <Card.Text>
                    Test
                    </Card.Text>
                <BoardToggle eventKey={boardId} />
                <Accordion.Collapse eventKey={boardId}>
                    <Board />
                </Accordion.Collapse>
            </Card.Body>
        </Card>
    )
}

export default BoardCard