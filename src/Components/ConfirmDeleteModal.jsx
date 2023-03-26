import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { onDeleteUser } from '../Utils/User.action';

export const ConfirmDelete = ({ openDel, setOpenDel, setOpen, fname, lname }) => {
    const handleClose = () => setOpenDel(false);
    const dispatch = useDispatch()
    const { users } = useSelector(state => state)

    const handleDelete = () => {
        let idxToDel = users.findIndex(x => x.name.first === fname && x.name.last === lname)
        dispatch(onDeleteUser(idxToDel))
        setOpen(false)
    };


    return (
        <>
            <Modal show={openDel} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>{`Are you sure you want you want to delete ${fname} ${lname}?`}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete()}>
                        Delete
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}
