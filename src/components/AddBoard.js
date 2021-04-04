import { Form } from 'react-bootstrap'
import { useState } from 'react'

const AddBoard = ({ boardData, setBoardData }) => {

    const [error, setError] = useState(false)

    const handleAddBoardSubmit = (e) => {
        const title = e.target.title.value
        if (!title) {
            console.log(error)
            e.preventDefault()
            setError(true)
            return
        }
        const description = e.target.description.value
        const newId = boardData[boardData.length - 1].id + 1
        const newBoardData = boardData
        newBoardData.push({
            "id": newId,
            "title": title,
            "description": description,
            "lists": [
                {
                    "listTitle": "todo",
                    "listItems": []
                },
                {
                    "listTitle": "event",
                    "listItems": []
                },
                {
                    "listTitle": "deadline",
                    "listItems": []
                },
            ]
        })
        localStorage.setItem('boards', JSON.stringify(newBoardData))
        setBoardData(newBoardData)
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