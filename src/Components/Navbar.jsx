import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { EditModal } from './EditModal';

export const NavbarComp = () => {
    const [showModal, setShowModal] = useState(false)
    const [info, setInfo] = useState(() => {
        return {
            title: '',
            firstName: '',
            lastName: '',
            email: '',
            streetNum: '',
            street: '',
            city: '',
            country: '',
            // index: 0
        }
    })
    const handleAddUser = () => {
        setShowModal(!showModal)
    }
    return (
        <>
            {showModal && <EditModal open={showModal} setOpen={(close) => setShowModal(close)} user={info} title={'Add New User'} />}

            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#adduser" onClick={() => handleAddUser()}>Add User</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

        </>
    );
}
