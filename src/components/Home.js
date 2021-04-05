import { Container, Accordion } from 'react-bootstrap'
import { useState } from 'react'

import EdiText from 'react-editext'

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

    // const handleBoardToggle = (e) => {
    //     setActiveKey(e);
    //     localStorage.setItem('activeKey', e)
    // }

    return (
        <Container fluid>
            <h1>Natrello</h1>
            <Accordion 
            // defaultActiveKey={activeKey} 
            // onSelect={(e) => handleBoardToggle(e)}
            >
                {boardData.map((board, index) => {
                    return (
                        <BoardCard key={board.id} board={board} setBoardData={setBoardData} />
                    )
                })}
            </Accordion>
            <AddBoardForm boardData={boardData} setBoardData={setBoardData} />
            <div>
                <EdiText showButtonsOnHover value='hello' onSave={(e) => console.log(e)} editOnViewClick={true} />
            </div>
        </Container>
    )
}

export default Home