import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export default function UserSideBar(props) {
    const [userProfile, setUserProfile] = useState([
        { id: "1", name: "first user", "last_message": "Bye", last_time: "20:30:30 AM" },
        { id: "2", name: "Second user", "last_message": "Bye", last_time: "20:30:30 AM" },
        { id: "3", name: "Third user", "last_message": "Bye", last_time: "20:30:30 AM" },
    ]);

    useEffect(() => {
        if (props.userData && Array.isArray(props.userData)) {
            setUserProfile(props.userData);
        }
    }, [props.userData]);

    return (
        <div className='col-4 border' style={{ 'height': '790px', "overflowY": "auto", "overflowX": "auto" }}>
            {userProfile.map((value, index) => {
                return (
                    <Link to={"/home?id=" + value._id} style={{ color: props.activeUser == value._id ? '' : 'inherit', textDecoration: 'none' }} key={value._id}>
                        <div className='d-flex mt-4 border-bottom pb-2'>
                            <img height="50" width="50" src="https://social-recruited-cdn.s3.eu-west-2.amazonaws.com/2024/candidate/gaia.jpg" className="rounded-circle" alt="..." />
                            <div>
                                <h5 className='ms-3 p-0 m-0'>{value.name.length > 10 ? `${value.name.slice(0, 10)}...` : value.name}</h5>
                                <p className='ms-3 p-0 m-0'>Last message</p>
                                {/* <p className='ms-3 p-0 m-0'>{value.last_message}</p> */}
                            </div>
                            <div className='ms-auto'>
                                <span>20:30:40am</span>
                                {/* <span>{value.last_time}</span> */}
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div >
    )
}
