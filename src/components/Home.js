import { Container, Row, Col, Accordion } from 'react-bootstrap'
import BoardCard from './BoardCard'
const Home = () => {
    return (
        <Container fluid>
            <h1>Natrello</h1>
            <Row>
            </Row>
            <Accordion>
                <BoardCard boardId="0"/>
                <BoardCard boardId="1"/>
                <BoardCard boardId="2"/>
                <BoardCard boardId="3"/>
            </Accordion>
        </Container>
    )
}

export default Home