import { useEffect, useState } from 'react';
import OrganizerProfileForm from '../component/form/OrganizerProfileForm'
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

interface ProfileProps {
    currentUserID: number,
    targetUserID: number,
}

interface Organizer {
    avatarSrc: string,
    organizerName: string,
    email: string,
    phoneNumber: string,
    description: string,
    address: string,
    fbLink?: string,
    websiteLink?: string,
    linkedInLink?: string,
}


const DetailOrganizer = (props: ProfileProps) => {
    const [organizer, setOrganizer] = useState<Organizer|null>(null);
    const [canEdit, setCanEdit] = useState(false);

    useEffect(() => {
        // fetch target organizer's data from the database based on their ID
        if (props.currentUserID === props.targetUserID) {
            setCanEdit(true);
            // fetch organizer's data with password
        } else {
            // fetch organizer's data without password
        }
    })

    return (
        <div>
            <div className='profile-header'>
                <div className="profile-thumbnail"></div>
                {
                    !organizer 
                    ? <Avatar className="profile-avatar" shape="circle" icon={<UserOutlined />}></Avatar>
                    : <img alt="User's avatar" src={organizer?.avatarSrc} /> 
                }
                <h2>{organizer? organizer.organizerName : 'Test Username'}</h2>
            </div>
            <OrganizerProfileForm 
                canEdit={canEdit}
                organizer={organizer}
            />
        </div>
    )
}

export default DetailOrganizer
