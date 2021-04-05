import { Row, Card } from 'react-bootstrap'
import AddListForm from './AddListForm'

import List from './List'

const Board = ({ lists, boardId, setBoardData }) => {
    return (
        <Card.Body>
            <Row>
                {lists.map((item, index) => {
                    return <List key={item.listId} list={item} boardId={boardId} setBoardData={setBoardData} />
                })}
            </Row>
            <AddListForm boardId={boardId} setBoardData={setBoardData} />
        </Card.Body>
    )
}

export default Board