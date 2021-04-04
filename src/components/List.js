import { Col, Row, Form } from 'react-bootstrap'

const List = ({ list, boardId, setBoardData }) => {

    const handleAddListItem = (e) => {
        e.preventDefault()
        const description = e.target.listItem.value

        const boards = JSON.parse(localStorage.getItem('boards'))
        boards[boardId].lists[list.listId].listItems.push(description)

        localStorage.setItem('boards', JSON.stringify(boards))
        setBoardData(boards)
        console.log(boards)
    }

    return (
        <Col>
            <Row>
                {list.listTitle}
            </Row>
            <Row>
                <ul>
                    {list.listItems.map((item, index) => {
                        return <li key={index}>{item}</li>
                    })}
                </ul>
            </Row>
            <Form onSubmit={handleAddListItem}>
                <Form.Group controlId='listItem'>
                    <Form.Control placeholder='New Item' />
                </Form.Group>
                <button type='submit'>Add Item</button>
            </Form>
        </Col>
    )
}

export default List