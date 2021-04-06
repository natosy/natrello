import { Col, Row, Card } from 'react-bootstrap'
import AddListForm from './AddListForm'

import List from './List'

const Board = ({ lists, boardId, setBoardData }) => {
    return (
        <Card.Body>
            <Row>
                {lists.map((item, index) => {
                    return <Col className='list-wrapper' xs={12} sm={6} md={4} lg={4} key={item.listId}>
                        <List list={item} boardId={boardId} setBoardData={setBoardData} />
                    </Col>


                })}
            </Row>
            <AddListForm boardId={boardId} setBoardData={setBoardData} />
        </Card.Body>
    )
}

export default Board