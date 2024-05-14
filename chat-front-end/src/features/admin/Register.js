import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { createUser } from './adminSlice';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ToastMessage from '../common/ToastMessage';

export default function Register() {
    const [formData, setFormData] = useState({});
    const [toast, setToast] = useState();
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const submitForm = async (e) => {
        dispatch(createUser(formData));
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}register`, formData);
            const message = response?.data?.data?.message;

            setToast({ bg: "success", type: "Success", message: message ?? "Register successfuly" });
            setTimeout(() => {
                navigate('login');
            }, 2000)

        } catch (error) {
            console.log(error);
            setToast({ bg: "danger", type: "Error", message: error.response.data.message ?? "Something is wrong" });
        }
        setTimeout(() => {
            setToast();
        }, 5000)
    }
    const setInputData = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
        <div>
            {toast && <ToastMessage bg={toast.bg} time="20 sec" type="Error" message={toast.message} />}
            <Form className='col-lg-8 mx-auto mt-5 pt-5'>
                <h1 className='text-center mb-5'>Register Form</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" onChange={setInputData} type="text" placeholder="Enter your name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={setInputData} name="email" type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={setInputData} name='password' type="password" placeholder="Password" />
                </Form.Group>
                <div className='d-flex justify-content-between'>
                    <Button onClick={submitForm} variant="primary" type="button">
                        Submit
                    </Button>
                    <Link to="login">Login</Link>
                </div>
            </Form>
        </div>
    )
}
