const ListItem = ({ item }) => {

    const onDragStart = (item) => {
        localStorage.setItem('dragItem', JSON.stringify(item))
    }

    return (
        <div draggable='true' onDragStart={() => onDragStart(item)}>{item.description}</div>
    )
}

export default ListItem