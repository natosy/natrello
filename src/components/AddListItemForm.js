import { useState } from 'react'
import { Form } from 'react-bootstrap'

const AddListItemForm = ({ boardId, listId, setBoardData }) => {

    const [description, setDescription] = useState('')

    const handleAddListItemSubmit = (e) => {
        // prevents page refresh
        e.preventDefault()

        if (description === '') return

        const boardData = JSON.parse(localStorage.getItem('boards'))
        
        // get actual indexes of board and list currently being edited (differs from id stored in data)
        const actualBoardId = boardData.findIndex(b => b.id === boardId)
        const actualListId = boardData[actualBoardId].lists.findIndex(l => l.listId === listId)

        // push new item into list (using actual listId stored in data)
        boardData[actualBoardId].lists[actualListId].listItems.push({
            listId: listId,
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