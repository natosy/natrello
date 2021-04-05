import EdiText from 'react-editext'
import { Row } from 'react-bootstrap'

const ListItem = ({ item, handleDeleteItem, handleEditItem }) => {

    const onDragStart = (item) => {
        localStorage.setItem('dragItem', JSON.stringify(item))
    }

    return (
        <div draggable='true' onDragStart={() => onDragStart(item)}>
            <Row>
                <button onClick={() => handleDeleteItem(item.listId, item.uniqueId)}>x</button>
                <EdiText
                    startEditingOnFocus
                    cancelOnUnfocus
                    submitOnEnter
                    cancelOnEscape
                    editButtonClassName='edit-buttons'
                    saveButtonClassName='edit-buttons'
                    cancelButtonClassName='edit-buttons'
                    validation={e => e.length > 0}
                    value={item.description}
                    onSave={(e) => handleEditItem(item.uniqueId, e)}
                    editOnViewClick={true}
                />
            </Row>
        </div>
    )
}

export default ListItem