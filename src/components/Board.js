import { Row, Col, Button } from 'react-bootstrap'

import List from './List'

const Board = ({ handleClick }) => {
    return (
        <Col md={12}>
            
            Showing board
            <List />
            <Button variant='primary' onClick={handleClick}>Close board</Button>
        </Col>
    )
}

export default Board