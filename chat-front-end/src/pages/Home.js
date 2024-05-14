import React, { useEffect, useState } from 'react'
import UserSideBar from '../features/user/UserSideBar';
import Message from '../features/user/Message';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';


export default function Home() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const reciver_id = searchParams.get('id');
    const token = useSelector((state) => state.userStore.token.payload);
    const [user, setUser] = useState({});

    const getUserList = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}get-user`, config);
            setUser(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (Object.keys(user).length == 0) getUserList();
    }, [user]);
    return (
        <div className='container border'>
            <div className='row'>
                <UserSideBar userData={user} activeUser={reciver_id} />
                {reciver_id && <Message />}
            </div >
        </div>
    )
}
