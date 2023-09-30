import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useEffect, useState } from "react";

import ParticipantProfileForm from '../component/form/ParticipantProfileForm'
// import React from 'react'

interface ProfileProps {
    currentUserID: number,
    targetUserID: number,
}


interface User {
    avatarSrc: string,
    username: string,
    email: string,
    phoneNumber: string,
    bio: string,
    address: string,
    password: string,
}


const DetailProfile = (props: ProfileProps) => {
    const [user, setUser] = useState<User|null>(null);
    const [canEdit, setCanEdit] = useState(false);

    useEffect(() => {
        // fetch target user's data from the database based on their ID
        if (props.currentUserID === props.targetUserID) {
            setCanEdit(true);
            // fetch user's data with password
        } else {
            // fetch user's data without password
        }
    })

    return (
        <div>
            detail profile
            <div className='profile-header'>
                <div className="profile-thumbnail"></div>
                {
                    !user 
                    ? <Avatar className="profile-avatar" shape="circle" icon={<UserOutlined />}></Avatar>
                    : <img alt="User's avatar" src={user?.avatarSrc} /> 
                }
                <h2>{user? user.username : 'Test Username'}</h2>
            </div>
            <ParticipantProfileForm 
                classNames="profile-participant"
                canEdit={canEdit}
                user={user}
            />
        </div>
    )
}

export default DetailProfile
