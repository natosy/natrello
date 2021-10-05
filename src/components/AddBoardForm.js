import { Button, Form, Alert } from 'react-bootstrap'
import { useState } from 'react'
import { getBoardData, saveBoard } from '../util/Util'

const AddBoardForm = ({ setBoardData }) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [error, setError] = useState(false)

    const handleAddBoardSubmit = (e) => {
        // prevents page refresh
        e.preventDefault()

        // checks for empty title (still need to modify error message)
        if (title === '') {
            // console.log('empty board creation not allowed')
            e.preventDefault()
            setError(true)
            return
        }

        setError(false)

        const boardData = getBoardData()

        boardData.push({
            id: Math.floor(Math.random() * 1000000),
            title: title,
            description: description,
            lists: [
                {
                    listId: Math.floor(Math.random() * 1000000),
                    listTitle: "To-Do",
                    listCapacity: 10,
                    listItems: []
                },
                {
                    listId: Math.floor(Math.random() * 1000000),
                    listTitle: "In Progress",
                    listCapacity: 10,
                    listItems: []
                },
                {
                    listId: Math.floor(Math.random() * 1000000),
                    listTitle: "Done",
                    listCapacity: 10,
                    listItems: []
                },
            ]
        })

        // saves to localstorage
        saveBoard(boardData, setBoardData)

        // resets fields after submitting
        setTitle('')
        setDescription('')
    }
    return (
        <div className='add-board-form'>
            <Form onSubmit={handleAddBoardSubmit}>
                <Form.Group controlId='title'>
                    <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                </Form.Group>
                {error
                    ? <Alert className='add-board-alert' variant='link'>
                        Please enter minimally the board title in order to create a board.
                    </Alert>
                    : ''}
                <Button variant='outline-dark' type='submit'>Add Board</Button>

            </Form>
        </div>
    )
}

export default AddBoardForm