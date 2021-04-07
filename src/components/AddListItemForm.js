import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { getBoardDataAfterAddItem, hasReachedListLimit, saveBoard } from '../util/Util'
const AddListItemForm = ({ boardId, listId, setBoardData }) => {

    const [description, setDescription] = useState('')

    const handleAddListItemSubmit = (e) => {
        // prevents page refresh
        e.preventDefault()
        if (description === '') {
            // console.log('empty item creation not allowed')
            return
        }

        if (hasReachedListLimit(boardId, listId)) {
            // console.log('reached list limit and cannot add item')
            return
        }
        // create item to be added
        const itemToAdd = {
            listId: listId,
            uniqueId: Math.floor(Math.random() * 1000000),
            description: description
        }

        // add to board, set state and save to localstorage
        saveBoard(
            getBoardDataAfterAddItem(boardId, listId, -1, itemToAdd),
            setBoardData
        )

        // resets field after submitting
        setDescription('')
    }

    return (
        <Form onSubmit={handleAddListItemSubmit}>
            <Form.Group controlId={listId}>
                <Form.Control value={description} onChange={e => setDescription(e.target.value)} placeholder='New Item' />
            </Form.Group>
            <Button variant='dark' type='submit'>Add Item</Button>
        </Form>
    )

}

export default AddListItemForm