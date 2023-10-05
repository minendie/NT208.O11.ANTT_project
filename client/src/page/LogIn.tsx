import LoginForm from '../component/form/LoginForm'
import { useNavigate } from 'react-router-dom'; // navigate to another page
import { useAuth } from '../auth/AuthContext'


const LogIn = () => {
    const navigate = useNavigate(); 
    // // prevent login when user already logged in 
    if (useAuth().isLoggedIn) {
        navigate(-1); // Navigate back to the previous page
    }

    return (
        <div>
           <LoginForm/>
        </div>
    );
};

export default LogIn;
