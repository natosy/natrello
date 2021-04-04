import { useState } from 'react'
import { Form } from 'react-bootstrap'

const AddListItemForm = ({ boardId, list, setBoardData }) => {

    const [description, setDescription] = useState('')

    const handleAddListItemSubmit = (e) => {
        // prevents page refresh
        e.preventDefault()

        if (description === '') return

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
        <Form onSubmit={handleAddListItemSubmit}>
            <Form.Group controlId='listItem'>
                <Form.Control value={description} onChange={e => setDescription(e.target.value)} placeholder='New Item' />
            </Form.Group>
            <button type='submit'>Add Item</button>
        </Form>
    )

}

export default AddListItemForm