import { Container, Col } from 'react-bootstrap'

const List = ({ list }) => {
    return (
        <Col>
            {list.listTitle}
            <ul>
                {list.listItems.map((item, index) => {
                    return <li key={index}>{item}</li>
                })}
            </ul>
        </Col>
    )
}

export default List