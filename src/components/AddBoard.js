import { Form } from 'react-bootstrap'
import { useState } from 'react'

const AddBoard = ({ setBoardData }) => {

    const [error, setError] = useState(false)

    const handleAddBoardSubmit = (e) => {
        e.preventDefault()
        const title = e.target.title.value
        if (!title) {
            console.log(error)
            e.preventDefault()
            setError(true)
            return
        }
        const description = e.target.description.value
        const boardData = JSON.parse(localStorage.getItem('boards'))
        const newId = boardData[boardData.length - 1].id + 1
        boardData.push({
            "id": newId,
            "title": title,
            "description": description,
            "lists": [
                {
                    "listId": 0,
                    "listTitle": "todo",
                    "listItems": []
                },
                {
                    "listId": 1,
                    "listTitle": "event",
                    "listItems": []
                },
                {
                    "listId": 2,
                    "listTitle": "deadline",
                    "listItems": []
                },
            ]
        })
        localStorage.setItem('boards', JSON.stringify(boardData))
        setBoardData(boardData)
    }
    return (
        <Form onSubmit={handleAddBoardSubmit}>
            <Form.Group controlId='title'>
                <Form.Control placeholder='Title' />
            </Form.Group>
            <Form.Group controlId='description'>
                <Form.Control placeholder='Description' />
            </Form.Group>
            <button type='submit'>Add Board</button>
            {error ? 'Please enter minimally the board title in order to create a board' : ''}
        </Form>
    )
}

export default AddBoard