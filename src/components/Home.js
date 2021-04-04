import { Container, Accordion } from 'react-bootstrap'

import BoardCard from './BoardCard'
import AddBoard from './AddBoard'
import { useState } from 'react'
import BoardDummyData from '../data/BoardData'

const Home = () => {
    var boards = localStorage.getItem('boards')
    if (boards) {
        boards = JSON.parse(boards)
    } else {
        boards = BoardDummyData
        localStorage.setItem('boards', JSON.stringify(boards))
    }

    const [activeKey, setActiveKey] = useState(localStorage.getItem('activeKey'))

    const [boardData, setBoardData] = useState(boards)

    const handleBoardToggle = (e) => {
        setActiveKey(e);
        localStorage.setItem('activeKey', e)

    }

    return (
        <Container fluid>
            <h1>Natrello</h1>
            <Accordion defaultActiveKey={activeKey} onSelect={(e) => handleBoardToggle(e)}>
                {boardData.map((item, index) => {
                    return <BoardCard key={item.id} board={item} setBoardData={setBoardData} />
                })}
            </Accordion>
            <AddBoard boardData={boardData} setBoardData={setBoardData} />
        </Container>
    )
}

export default Home