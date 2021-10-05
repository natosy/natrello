import EdiText from 'react-editext'
import { Draggable } from 'react-beautiful-dnd'

const ListItem = ({ item, handleDeleteItem, handleEditItem, index }) => {

    return (
        // <div className='list-item' draggable='true' onDragStart={(e) => onDragStart(item)}>
        <Draggable draggableId={item.uniqueId.toString()} index={index} 
        // className='list-item' onDragStart={(e) => onDragStart(item)}
        >
            {(provided) => (
                <div
                    ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                    className='list-item'
                >
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
                    <i class='fa fa-times' onClick={() => handleDeleteItem(item.listId, item.uniqueId)}></i>
                </div>
            )}
        </Draggable>
        // </div>

    )
}

export default ListItem