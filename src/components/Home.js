import { Form, Container, Row, Col, Accordion } from 'react-bootstrap'

import BoardCard from './BoardCard'
import AddBoard from './AddBoard'
import { useState } from 'react'
import BoardData from '../data/BoardData'

const Home = () => {

    var boards = localStorage.getItem('boards')
    if (boards) {
        boards = JSON.parse(boards)
    } else {
        boards = BoardData
        localStorage.setItem('boards', JSON.stringify(boards))
    }

    const [boardData, setBoardData] = useState(boards)

    return (
        <Container fluid>
            <h1>Natrello</h1>
            <Accordion >
                {boardData.map((item, index) => {
                    return <BoardCard key={item.id} boardData={item} />
                })}
            </Accordion>
            <AddBoard boardData={boardData} setBoardData={setBoardData} />
        </Container>
    )
}

export default Home