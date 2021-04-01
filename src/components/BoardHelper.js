/**
 * Not used currently
 */

import { Card, Col, Button } from 'react-bootstrap'
import { useState } from 'react'

import BoardCard from './BoardCard'
import Board from './Board'

const BoardHelper = () => {

    const [showBoard, setShowBoard] = useState(false);

    const handleClick = () => {
        setShowBoard(!showBoard)
    }

    return showBoard
        ? <Board handleClick={handleClick} />
        : <BoardCard handleClick={handleClick} />
}

export default BoardHelper;