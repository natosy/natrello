import { Form } from 'react-bootstrap'
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
            console.log('empty board creation not allowed')
            e.preventDefault()
            setError(true)
            return
        }

        setError(false)

        const boardData = getBoardData()

        boardData.push({
            id: new Date().valueOf(),
            title: title,
            description: description,
            lists: [
                {
                    listId: new Date().valueOf() + 1,
                    listTitle: "To-Do",
                    listCapacity: 10,
                    listItems: []
                },
                {
                    listId: new Date().valueOf() + 2,
                    listTitle: "In Progress",
                    listCapacity: 10,
                    listItems: []
                },
                {
                    listId: new Date().valueOf() + 3,
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

export default AddBoardForm