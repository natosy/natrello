const ListItem = ({ item, handleDelete }) => {

    const onDragStart = (item) => {
        localStorage.setItem('dragItem', JSON.stringify(item))
    }

    return (
        <div draggable='true' onDragStart={() => onDragStart(item)}>
            {item.description}
            <button onClick={() => handleDelete(item.listId, item.uniqueId)}>x</button></div>
    )
}

export default ListItem