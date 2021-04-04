import { Col, Row, Form } from 'react-bootstrap'
import { useState } from 'react'


import ListItem from './ListItem'

const List = ({ list, boardId, setBoardData }) => {

    const [description, setDescription] = useState('')

    const handleAddListItem = (e) => {
        // prevents page refresh
        e.preventDefault()

        const boardData = JSON.parse(localStorage.getItem('boards'))
        boardData[boardId].lists[list.listId].listItems.push({
            listId: list.listId,
            uniqueId: new Date().valueOf(),
            description: description
        })

        // saves to localstorage
        localStorage.setItem('boards', JSON.stringify(boardData))
        setBoardData(boardData)

        // resets field after submitting
        setDescription('')
    }

    return (
        <Col>
            <Row>
                <h6>
                    {list.listTitle}
                </h6>
            </Row>
            {list.listItems.map((item, index) => {
                return <ListItem key={index} setBoardData={setBoardData} {...item} />
            })}
            <Row>
                <Form onSubmit={handleAddListItem}>
                    <Form.Group controlId='listItem'>
                        <Form.Control value={description} onChange={e => setDescription(e.target.value)} placeholder='New Item' />
                    </Form.Group>
                    <button type='submit'>Add Item</button>
                </Form>
            </Row>
        </Col>
    )
}

export default List