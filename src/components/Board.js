import { Row, Col, Button, Card } from 'react-bootstrap'

import List from './List'

const Board = ({ handleClick }) => {
    return (
        <Card.Body>
            <Row>
                <p>Showing board</p>
            </Row>
            <Row>
                <List />
                <List />
                <List />
            </Row>
        </Card.Body>
    )
}

export default Board