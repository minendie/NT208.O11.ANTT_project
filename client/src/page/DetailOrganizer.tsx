import { useEffect, useState } from 'react';
import OrganizerProfileForm from '../component/form/Profile/OrganizerProfileForm'
import '../component/form/Profile/css/styles.css'
import axios from "axios";
import { useParams } from "react-router-dom";


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


const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const DetailOrganizer = () => {
    const [organizer, setOrganizer] = useState<Organizer|null>(null);
    const [canEdit, setCanEdit] = useState(false);
    const { organizerID } = useParams();

    useEffect(() => {
        // fetch target organizer's data from the database based on their ID
        axios.get(`${API_ENDPOINT}/organizer/${organizerID}`, { 
            headers: {
                'ngrok-skip-browser-warning': true
            }
        })
        .then((result) => {
            const userInfo = result.data[0];
            setOrganizer({
                ...userInfo,
            })
            console.log(userInfo)
        })
        .catch((error) => {
            console.error(error);
        });
    })

    return (
        <div>
            <div className="bg-cyan-500 ...">
                    <div className="profile-cover"></div>                        
                </div>
                <div className="avatar">
                    <img className="w-16 h-16 rounded-full border-2 border-black " src="https://img-qn.51miz.com/preview/element/00/01/15/69/E-1156995-FB1729B5.jpg" alt="" />
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
