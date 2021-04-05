import { Form } from 'react-bootstrap'
import { useState } from 'react'

import { getBoardData, getBoardIndex, saveBoard } from '../util/Util'

const AddListForm = ({ boardId, setBoardData }) => {
    const [title, setTitle] = useState('')

    const [error, setError] = useState(false)

    const handleAddBoardSubmit = (e) => {
        // prevents page refresh
        e.preventDefault()

        // checks for empty title (still need to modify error message)
        if (title === '') {
            console.log('empty list title creation not allowed')
            e.preventDefault()
            setError(true)
            return
        }

        setError(false)

        const boardData = getBoardData()
        const boardIndex = getBoardIndex(boardId)
        boardData[boardIndex].lists.push(
            {
                listId: new Date().valueOf(),
                listTitle: title,
                listCapacity: 10,
                listItems: []
            })

        // saves to localstorage
        saveBoard(boardData, setBoardData)

        // resets fields after submitting
        setTitle('')
    }
    return (
        <Form onSubmit={handleAddBoardSubmit}>
            <Form.Group controlId={boardId}>
                <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
            </Form.Group>

            <button type='submit'>Add List</button>
            {error ? 'Please enter a non-empty list title in order to create a list' : ''}
        </Form>
    )
}

export default AddListForm