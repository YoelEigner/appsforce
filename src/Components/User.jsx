import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { EditModal } from './EditModal';


export const User = (props) => {
    const { title, firstName, lastName, email, imageSrc, country, city, street, streetNum, id, index } = props
    const [showModal, setShowModal] = useState(false)

    const handleEdit = () => {
        setShowModal(!showModal)
    }
    const modalTitle = `Edit ${firstName} ${lastName}'s personal info`
    return (
        <Container className="user-container" >
            {showModal && <EditModal open={showModal} setOpen={(close) => setShowModal(close)} user={props} index={index} title={modalTitle}/>}
            <Row className="user-row" onClick={() => { handleEdit() }}>
                <Col md={3} className="user-image-col">
                    <Image src={imageSrc} roundedCircle fluid className="user-image" />
                </Col>
                <Col md={9} className="user-info-col">
                    <h4 className="user-name">{`${title} ${firstName} ${lastName}`}</h4>
                    <p className="user-email">{email}</p>
                    <p className="user-location">{`${streetNum}, ${street}, ${city}, ${country}`}</p>
                    <p className="user-id">{`ID: ${id}`}</p>
                </Col>
            </Row>
        </Container>
    )
}