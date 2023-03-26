import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from '../firebase/config'

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [, setLocation] = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            setEmail("");
            setPassword("");
            setLocation("/");
        } catch (error) {
            console.error(error);
        }
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
    };
    return (
        <div className='min-h-screen grid place-content-center gap-10'>
            <h1 className='text-4xl font-bold text-center'>TwittBase</h1>

            <div className="bg-ctp-base rounded-2xl py-10 px-5 flex flex-col gap-10">
                <h2 className="text-3xl text-center">{isSignUp ? "Sign Up" : "Sign In"}</h2>
                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                    <input type="email" placeholder="yourname@mail.com" className='text-ctp-base rounded-lg border-2 border-ctp-crust px-2' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" className='text-ctp-base rounded-lg border-2 border-ctp-crust px-2' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="border-2 px-3 py-1 rounded-lg">{isSignUp ? "Sign Up" : "Sign In"}</button>
                    <span className='text-sm hover:underline cursor-pointer select-none' onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}</span>
                </form>
                <div className="flex justify-evenly gap-3">
                    <button onClick={signInWithGoogle} className="border-2 px-3 py-1 rounded-lg">Connect With Google</button>
                    <button className="border-2 px-3 py-1 rounded-lg">Connect With Github</button>
                </div>
            </div>

            <br />
        </div>
    )
}

export default Login
