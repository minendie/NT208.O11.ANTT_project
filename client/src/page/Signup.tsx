import SignupForm from '../component/form/SignupForm'
import { useNavigate } from 'react-router-dom'; // navigate to another page
import { useAuth } from '../auth/AuthContext'


const Signup = () => {
    const navigate = useNavigate(); 
    const auth = useAuth()
    if (auth.isLoggedIn) {
        navigate(-1); // Navigate back to the previous page
    }

    return (
        <div>
            <SignupForm/>
        </div>
    );
};

export default Signup;
