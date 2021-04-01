import { Form, Container, Row, Col, Accordion } from 'react-bootstrap'

import BoardCard from './BoardCard'
import AddBoard from './AddBoard'

const Home = () => {
    return (
        <Container fluid>
            <h1>Natrello</h1>
            <Accordion>
                <BoardCard boardId="0" />
                <BoardCard boardId="1" />
                <BoardCard boardId="2" />
                <BoardCard boardId="3" />
            </Accordion>
            <AddBoard />
        </Container>
    )
}

export default Home