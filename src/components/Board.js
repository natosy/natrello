import { Row, Col, Button, Card } from 'react-bootstrap'

import List from './List'

const Board = ({ lists }) => {
    return (
        <Card.Body>
            <Row>
                {lists.map((item, index) => {
                    return <List key={index} list={item} />
                })}
            </Row>
        </Card.Body>
    )
}

export default Board