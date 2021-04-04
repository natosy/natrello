import { Form } from 'react-bootstrap'
import { useState } from 'react'

const AddBoard = ({ setBoardData }) => {

    const [error, setError] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleAddBoardSubmit = (e) => {
        // prevents page refresh
        e.preventDefault()

        // checks for empty title (still need to modify error message)
        if (title === '') {
            console.log(error)
            e.preventDefault()
            setError(true)
            return
        }
        
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

        // saves to localstorage
        localStorage.setItem('boards', JSON.stringify(boardData))
        setBoardData(boardData)

        // resets fields after submitting
        setTitle('')
        setDescription('')
    }
    return (
        <Form onSubmit={handleAddBoardSubmit}>
            <Form.Group controlId='title'>
                <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
            </Form.Group>
            <Form.Group controlId='description'>
                <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
            </Form.Group>
            <button type='submit'>Add Board</button>
            {error ? 'Please enter minimally the board title in order to create a board' : ''}
        </Form>
    )
}

export default AddBoard