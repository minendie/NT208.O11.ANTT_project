import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../component/form/Profile/css/styles.css'
import OrganizerProfileForm from '../component/form/Profile/OrganizerProfileForm'
import {useAuth} from '../auth/AuthContext'
import { useOrgan } from "../contexts/OrganizerContext";





interface Organizer {
    Name: string,
    Email: string,
    PhoneNumber: string,
    Description: string,
    FB_Link?: string,
    Website?: string,
    LinkedIn_Link?: string,
}


const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const DetailOrganizer = () => {
    const [organizer, setOrganizer] = useState<Organizer|null>(null);
    const {organizerID} = useParams();
    const organ = useOrgan();
    const auth = useAuth();
    const [canEdit, setcanEdit] = useState(false)
    
    
    
    

    useEffect(() => {
        // fetch target organizer's data from the database based on their ID
        
        axios.get(`${API_ENDPOINT}/organizer/${organizerID}`, { 
            headers: {
                'ngrok-skip-browser-warning': true
            }
        })
        .then((result) => {
            setcanEdit(auth.isLoggedIn && organ.organizerID == organizerID)
            
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
        <div className="bg-cyan-500 z-10">             
            <div className="flex gap-5 items-center mx-7 pt-15 flex-row text-white">
            <img className="w-32 rounded-full border-2 border-black " src="https://img-qn.51miz.com/preview/element/00/01/15/69/E-1156995-FB1729B5.jpg" alt="" />
            <h1 style={{color:"white"}}>{organizer?.Name || ''}</h1>
            </div>
        </div>                
            {organizer&& <OrganizerProfileForm
            // classNames="profile-organizer"           
            canEdit={canEdit}
            organizer={organizer}
            />}
        </div>
    )
}

export default DetailOrganizer
