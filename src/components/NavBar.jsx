import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation } from 'wouter'
import { auth } from '../firebase/config'
import useUser from '../global/user';

const NavBar = () => {
    const [isLogged] = useAuthState(auth);
    const { username } = useUser();
    const [, setLocation] = useLocation();

    const handleLogout = () => {
        auth.signOut();
        setLocation('/');
    }

    return (
        <>
            <nav className='flex justify-between text-lg font-bold'>
                <Link href='/'>
                    <a>TwittBase</a>
                </Link>
                {
                    isLogged && (
                        <Link href={`/user/${username}`}>
                            <a>My Profile</a>
                        </Link>
                    )
                }
                <Link href='/search'>
                    <a>Search</a>
                </Link>
                {
                    !isLogged && (
                        <Link href='/login'>
                            <a>Login</a>
                        </Link>
                    )
                }
                {
                    isLogged && (
                        <Link onClick={handleLogout}>
                            <a>Logout</a>
                        </Link>
                    )
                }
            </nav>
            <hr />
        </>
    )
}

export default NavBar