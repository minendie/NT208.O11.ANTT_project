import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useEffect, useState } from "react";
import '../component/form/Profile/css/styles.css'
import ParticipantProfileForm from '../component/form/Profile/ParticipantProfileForm'
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
            {/**detail profile**/}
            
                <div class="bg-cyan-500 ... z-10">                 
                
                    <div className="flex gap-5 items-center mx-7 pt-15 flex-row text-white">
                    <img class="w-32 rounded-full border-2 border-black " src="https://img-qn.51miz.com/preview/element/00/01/15/69/E-1156995-FB1729B5.jpg" alt="" />
                    <h1> Username</h1>
                    </div>  
                
                        
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
