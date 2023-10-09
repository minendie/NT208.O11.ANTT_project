import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../component/form/Profile/css/styles.css'
import ParticipantProfileForm from '../component/form/Profile/ParticipantProfileForm'
import { useAuth } from '../auth/AuthContext'


interface User {
    username: string,
    email: string,
    phoneNumber?: string,
    bio: string,
    address?: string,
    password?: string,
}

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;


const DetailProfile = () => {
    const [user, setUser] = useState<User|null>(null);
    const { targetUsername } = useParams();
    const auth = useAuth();
    const canEdit = auth.isLoggedIn && auth.username === targetUsername;

    useEffect(() => {
        // fetch target user's data from the database based on their username
        // fetch user's data with password
        axios.get(`${API_ENDPOINT}/users/${targetUsername}`, { 
            headers: {
                'ngrok-skip-browser-warning': true
            }
        })
        .then((result) => {
            const userInfo = result.data[0];
            setUser({
                ...userInfo,
            })
        })
        .catch((error) => {
            console.error(error);
          });
    }, [targetUsername])

    return (
        <div>
            <div className="bg-cyan-500 z-10">             
                <div className="flex gap-5 items-center mx-7 pt-15 flex-row text-white">
                <img className="w-32 rounded-full border-2 border-black " src="https://img-qn.51miz.com/preview/element/00/01/15/69/E-1156995-FB1729B5.jpg" alt="" />
                <h1>{targetUsername}</h1>
                </div>  
            </div> 
            
            {user && <ParticipantProfileForm 
                canEdit={canEdit}
                user={user}
            />}
        </div>
    )
}

export default DetailProfile