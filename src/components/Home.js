import { Container, Accordion } from 'react-bootstrap'
import { useState } from 'react'

import BoardCard from './BoardCard'
import AddBoardForm from './AddBoardForm'
import BoardDummyData from '../data/BoardData'

const Home = () => {

    // initialisation of boards (default or from localstorage)
    var boards = localStorage.getItem('boards')
    if (boards) {
        boards = JSON.parse(boards)
    } else {
        boards = BoardDummyData
        localStorage.setItem('boards', JSON.stringify(boards))
    }

    const [boardData, setBoardData] = useState(boards)

    return (
        <Container fluid>
            <div className='row header'>
                <h1>Natrello</h1>
            </div>

            <Accordion>
                {boardData.map((board, index) => {
                    return (
                        <BoardCard key={board.id} board={board} setBoardData={setBoardData} />
                    )
                })}
            </Accordion>
            <AddBoardForm boardData={boardData} setBoardData={setBoardData} />
        </Container>
    )
}

export default Home