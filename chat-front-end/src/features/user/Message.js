import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io("http://localhost:4000");

export default function Message() {
    const [messageArr, setMessageArr] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const reciver_id = searchParams.get('id');
    const [message, setMessage] = useState("");
    const user_id = useSelector((state) => state.userStore.userDetails.payload.userData._id);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to socket server");
        });

        socket.on('chat message', (msg) => {
            console.log(msg);
            setMessageArr(prevMessages => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, [reciver_id]);

    useEffect(() => {
        setMessageArr([]);
    }, [reciver_id]);

    const pushMessage = () => {
        if (message.trim().length <= 0) return false;

        socket.emit('chat message', { message: message, sender_id: user_id, reciver_id: reciver_id });
        setMessage("");
    };

    const getMessage = (event) => {
        setMessage(event.target.value);
        if (event.key === 'Enter') {
            pushMessage();
        }
    };

    return (
        <div className='col-8'>
            <div style={{ 'height': '700px', 'marginTop': '20px', 'overflowY': 'scroll' }}>
                {messageArr.map((value, index) => (
                    <div className='chat' key={index}>
                        {value.sender_id === user_id && value.reciver_id === reciver_id && (
                            <div className='user'>
                                <p className='d-flex justify-content-end'><span className='border p-2 rounded-start rounded-top bg-primary text-white'>{value.message}</span></p>
                            </div>
                        )}
                        {value.reciver_id === user_id && value.sender_id === reciver_id && (
                            <div className='response'>
                                <p ><span className='border p-2 rounded-end rounded-top'>{value.message}</span></p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className='d-flex'>
                <Form.Control className='p-3' value={message} onKeyDown={getMessage} onChange={getMessage} name='message' type="text" placeholder="Type message" />
                <Button className='ms-3' onClick={pushMessage}>Send</Button>
            </div>
        </div>
    );
}
