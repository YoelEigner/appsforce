import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { onAddUser, onDeleteUser, onEditUser } from '../Utils/User.action';
import { emailValidation, validateUser } from '../Utils/Utils';
import { ConfirmDelete } from './ConfirmDeleteModal';

export const EditModal = ({ open, setOpen, user, index, title }) => {
    const [countryErr, setCountryErr] = useState(false)
    const [streetErr, setStreetErr] = useState(false)
    const [cityErr, setCityErr] = useState(false)
    const [emailErr, setEmailErr] = useState(false)
    const [fNameErr, setfNameErr] = useState(false)
    const [lNameErr, setlNameErr] = useState(false)
    const [openDel, setOpenDel] = useState(false)
    const { users } = useSelector(state => state)
    const [update, setUpdate] = useState(false)
    useEffect(() => {
        if (title === 'Add New User') { setUpdate(false) }
        else setUpdate(true)
    }, [title])

    const dispatch = useDispatch()
    const [info, setInfo] = useState(() => {
        return {
            title: user.title,
            fname: '',
            lname: '',
            email: '',
            number: '',
            street: '',
            city: '',
            country: '',
        }
    })

    const handleClose = () => {
        setOpen(false)
    };
    const handleDelete = () => {
        setOpenDel(true)
    }

    const handleEdit = (name, value) => {
        setInfo((prevState) => ({ ...prevState, [name]: value }))
    }
    const handleUpdate = async () => {
        if (Object.values(info).some((value) => value === '') || countryErr || cityErr || streetErr || emailErr || fNameErr || lNameErr) {
            for (const [key, value] of Object.entries(info)) {
                if (value === '') {
                    if (key === 'street') setStreetErr(true)
                    else if (key === 'city') setCityErr(true)
                    else if (key === 'country') setCountryErr(true)
                    else if (key === 'email') setEmailErr(true)
                    else if (key === 'fname') setfNameErr(true)
                    else if (key === 'lname') setlNameErr(true)
                }
            }
        }
        else {
            if (update) {
                if (!emailValidation(info.email, users)) {
                    setEmailErr(true)
                }
                else {
                    let idxToUpdate = users.findIndex(x => x.name.first === user.firstName)
                    await dispatch(onEditUser(info, idxToUpdate))
                    setOpen(false)
                }

            }
            else {
                info.id = Math.random().toString(36).substring(2, 9 + 2)
                await dispatch(onAddUser(info))
                setOpen(false)
            }

        }

    }
    const handleBlur = (name, value) => {
        validateUser(name, value, setlNameErr, setfNameErr, setEmailErr, setCityErr, setStreetErr, setCountryErr, users)
    }
    return (
        <>
            <ConfirmDelete openDel={openDel} setOpen={(data) => { setOpen(data) }} setOpenDel={(data) => setOpenDel(data)} fname={user.firstName} lname={user.lastName} />
            <Modal
                show={open}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {!update && <Form.Label>Title</Form.Label>}
                        {!update && <Form.Control type="text" placeholder={`${user.title}`}
                            onChange={(e) => { handleEdit('title', e.target.value) }} onBlur={(e) => { handleBlur('title', e.target.value) }} />}

                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder={`${user.firstName}`}
                            onChange={(e) => { handleEdit('fname', e.target.value) }} onBlur={(e) => { handleBlur('fname', e.target.value) }} />
                        {fNameErr && <Form.Text style={{ color: 'red' }}>{'Please enter a first name (min  3 characters)'}<br /></Form.Text>}
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder={`${user.lastName}`}
                            onChange={(e) => { handleEdit('lname', e.target.value) }} onBlur={(e) => { handleBlur('lname', e.target.value) }} />
                        {lNameErr && <Form.Text style={{ color: 'red' }}>{'Please enter a last name (min  3 characters)'}<br /></Form.Text>}

                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder={`${user.email}`}
                            onChange={(e) => { handleEdit('email', e.target.value) }} onBlur={(e) => { handleBlur('email', e.target.value) }} />
                        {emailErr && <Form.Text style={{ color: 'red' }}>{'Please enter a valid email address and ensure that this email is not in use!'}<br /></Form.Text>}

                        <Form.Label>Street</Form.Label>
                        <Form.Control type="text" placeholder={`${user.street}`}
                            onChange={(e) => { handleEdit('street', e.target.value) }} onBlur={(e) => { handleBlur('street', e.target.value) }} />
                        {streetErr && <Form.Text style={{ color: 'red' }}>{'Please enter a street name'}<br /></Form.Text>}

                        {<Form.Label>House Number</Form.Label>}
                        {<Form.Control type="text" placeholder={`${user.streetNum}`}
                            onChange={(e) => { handleEdit('number', e.target.value) }} onBlur={(e) => { handleBlur('number', e.target.value) }} />}

                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder={`${user.city}`}
                            onChange={(e) => { handleEdit('city', e.target.value) }} onBlur={(e) => { handleBlur('city', e.target.value) }} />
                        {cityErr && <Form.Text style={{ color: 'red' }}>{'Please enter a city name'}<br /></Form.Text>}
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" placeholder={` ${user.country}`}
                            onChange={(e) => { handleEdit('country', e.target.value) }} onBlur={(e) => { handleBlur('country', e.target.value) }} />
                        {countryErr && <Form.Text style={{ color: 'red' }}>{'Please enter a country name'}<br /></Form.Text>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {update && <Button variant="danger" onClick={() => handleDelete()}>
                        Delete
                    </Button>}
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdate()}>{update ? 'Update' : 'Add'}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
