import EdiText from 'react-editext'
import { Row } from 'react-bootstrap'

const ListItem = ({ item, handleDeleteItem, handleEditItem }) => {

    const onDragStart = (item) => {

        localStorage.setItem('dragItem', JSON.stringify(item))
    }

    return (
        <div className='list-item' draggable='true' onDragStart={(e) => onDragStart(item)}>
            <EdiText
                startEditingOnFocus
                cancelOnUnfocus
                submitOnEnter
                cancelOnEscape
                viewContainerClassName='list-item-view-container'
                editButtonClassName='edit-button'
                saveButtonClassName='edit-button'
                cancelButtonClassName='edit-button'
                validation={e => e.length > 0}
                value={item.description}
                onSave={(e) => handleEditItem(item.uniqueId, e)}
                editOnViewClick={true}
            />
            <button className='delete-item-button' onClick={() => handleDeleteItem(item.listId, item.uniqueId)}>X</button>
        </div>
    )
}

export default ListItem