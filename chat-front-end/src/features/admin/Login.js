import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { loginUser, userDetail } from './adminSlice';
import { Link } from 'react-router-dom';
import ToastMessage from '../common/ToastMessage';
import axios from 'axios';
import UserContext from '../../Context/UserContext';

export default function Login() {
    const [loginObj, setLoginObj] = useState({});
    const [toast, setToast] = useState();
    const dispatch = useDispatch();
    const { setIsAuthenticated } = useContext(UserContext);
    const submitForm = async () => {
        try {
            dispatch(loginUser(loginObj));
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}login`, loginObj);
            const message = response?.data?.data?.message;
            dispatch(userDetail(response.data));
            localStorage.setItem('login', JSON.stringify(response.data));
            setToast({ bg: "success", type: "Success", message: message ?? "Login successfuly" });
            setTimeout(() => {
                setIsAuthenticated(true)
            }, 2000);
        } catch (error) {
            setToast({ bg: "danger", type: "Error", message: error.response?.data?.message ?? "Something is wrong" });
        }
        setTimeout(() => {
            setToast();
        }, 5000)
    }
    const setInputData = (event) => {
        const { name, value } = event.target;
        setLoginObj(
            { ...loginObj, [name]: value }
        );
    }
    return (
        <div>
            {toast && <ToastMessage bg={toast.bg} time="20 sec" type="Error" message={toast.message} />}
            <Form className='col-lg-8 mx-auto mt-5 pt-5'>
                <h1 className='text-center mb-5'>Login Form</h1>
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
                    <Link to="/">Register</Link>
                </div>
            </Form>
        </div>
    )
}
