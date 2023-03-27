import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from '../firebase/config'
import { useLocation } from 'wouter';
import { useAuthState } from 'react-firebase-hooks/auth';

const Register = () => {
    const [isLogged] = useAuthState(auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [, setLocation] = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
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

            <div className="bg-ctp-base rounded-2xl py-10 px-5 flex flex-col gap-10">
                <h2 className="text-3xl text-center">Sign Up</h2>
                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                    <input type="email" placeholder="yourname@mail.com" className='text-ctp-base rounded-lg border-2 border-ctp-crust px-2' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" className='text-ctp-base rounded-lg border-2 border-ctp-crust px-2' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="border-2 px-3 py-1 rounded-lg">Sign Up</button>
                    <span className='text-sm hover:underline cursor-pointer select-none' onClick={() => setLocation("/login")}>Already have an account? Sign In</span>
                </form>
                <div className="flex justify-evenly gap-3">
                    <button onClick={signInWithGoogle} className="border-2 px-3 py-1 rounded-lg">Sign Up With Google</button>
                </div>
            </div>

            <br />
        </div>
    )
}

export default Register