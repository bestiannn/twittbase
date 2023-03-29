import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from '../firebase/config'
import { useLocation } from 'wouter';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsGoogle } from 'react-icons/bs';
import { FiLogIn } from 'react-icons/fi';

function Login() {
    const [isLogged] = useAuthState(auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [, setLocation] = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");
        } catch (error) {
            console.error(error);
        }
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
    };

    useEffect(() => {
        if (isLogged) {
            setLocation("/");
        }
    }, [isLogged]);

    return (
        <div className='min-h-screen grid place-content-center gap-10'>
            <h1 className='text-4xl font-bold text-center'>TwittBase</h1>

            <div className="bg-ctp-base rounded-2xl py-10 px-5 flex flex-col gap-10 w-96">
                <h2 className="text-3xl text-center">Sign In</h2>
                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                    <input type="email" placeholder="yourname@mail.com" className='text-ctp-base rounded-lg border-2 border-ctp-crust px-2' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" className='text-ctp-base rounded-lg border-2 border-ctp-crust px-2' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="border-2 px-3 py-1 rounded-lg flex justify-center gap-5 hover:bg-ctp-mantle text-lg"><FiLogIn className='w-5 h-5 mt-1' />Sign In</button>
                    <span className='hover:underline cursor-pointer select-none' onClick={() => setLocation('/register')}>Don't have an account? Sign Up.</span>
                </form>
                <button onClick={signInWithGoogle} className="border-2 px-3 py-2 rounded-lg flex justify-center gap-5 hover:bg-ctp-mantle">
                    <BsGoogle className='w-5 h-5' />Sign In With Google
                </button>
            </div>

            <br />
        </div>
    )
}

export default Login
