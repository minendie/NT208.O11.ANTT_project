import { useEffect, useState } from 'react';
import OrganizerProfileForm from '../component/form/Profile/OrganizerProfileForm'
import { UserOutlined } from "@ant-design/icons";
import '../component/form/Profile/css/styles.css'
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
            <div class="bg-cyan-500 ...">
                    <div className="profile-cover"></div>                        
                </div>
                <div className="avatar">
                    <img class="w-16 h-16 rounded-full border-2 border-black " src="https://img-qn.51miz.com/preview/element/00/01/15/69/E-1156995-FB1729B5.jpg" alt="" />
                     Username
                </div>                
            <OrganizerProfileForm 
                canEdit={canEdit}
                organizer={organizer}
            />
        </div>
    )
}

export default DetailOrganizer
