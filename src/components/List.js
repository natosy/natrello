import { Col, Row, Form } from 'react-bootstrap'
import { useState } from 'react'

const List = ({ list, boardId, setBoardData }) => {

    const [description, setDescription] = useState('')

    const handleAddListItem = (e) => {
        // prevents page refresh
        e.preventDefault()

    
        const boardData = JSON.parse(localStorage.getItem('boards'))
        boardData[boardId].lists[list.listId].listItems.push(description)

        // saves to localstorage
        localStorage.setItem('boards', JSON.stringify(boardData))
        setBoardData(boardData)

        // resets field after submitting
        setDescription('')
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
                    <Form.Control value={description} onChange={e => setDescription(e.target.value)} placeholder='New Item' />
                </Form.Group>
                <button type='submit'>Add Item</button>
            </Form>
        </Col>
    )
}

export default List