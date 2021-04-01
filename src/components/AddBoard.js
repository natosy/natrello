import { Form, Row, Col } from 'react-bootstrap'

const AddBoard = () => {
    return (
        <Form>
            <Form.Row>
                <Col>
                    <Form.Label>Add A Board</Form.Label>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Control placeholder="Board Title" />
                </Col>
                <Col>
                    <Form.Control placeholder="Board Description" />
                </Col>
                <button>Create Board</button>
            </Form.Row>
        </Form>
    )
}

export default AddBoard