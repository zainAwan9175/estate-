import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updatecurrentuser, updateactive } from '../redux/userredux';

function Auth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    axios.defaults.withCredentials = true;

    async function handleGoogleSubmission() {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            axios.post("https://estate-api-orcin.vercel.app/auth/google", { name: result.user.displayName, email: result.user.email, photo: result.user.photoURL }, { withCredentials: true })
                .then((res) => {
                    if (res.data.register || res.data.login) {
                        dispatch(updatecurrentuser(res.data.newuser));
                        navigate("/");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log("Failed to continue with Google", err);
        }
    }

    return (
        <button 
            onClick={handleGoogleSubmission} 
            type="button" 
            className='p-2 shadow-2xl hover:bg-red-900 duration-300 bg-red-600 text-white rounded-md outline-none w-full'>
            CONTINUE WITH GOOGLE
        </button>
    );
}

export default Auth;
