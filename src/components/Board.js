import { Row, Card } from 'react-bootstrap'

import List from './List'

const Board = ({ lists, boardId, setBoardData }) => {
    // lists.map((item, index) => console.log(item))
    return (
        <Card.Body>
            <Row>
                {lists.map((item, index) => {
                    return <List key={item.listId} list={item} boardId={boardId} setBoardData={setBoardData} />
                })}
            </Row>
        </Card.Body>
    )
}

export default Board