import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation } from 'wouter'
import { auth } from '../firebase/config'
import useFollowing from '../global/following';
import useUser from '../global/user';

const NavBar = () => {
    const [isLogged] = useAuthState(auth);
    const { username, resetUid, resetUsername } = useUser();
    const { resetFollowingList, resetUsernamesList } = useFollowing();
    const [, setLocation] = useLocation();

    const handleLogout = async() => {
        await auth.signOut();
        resetFollowingList();
        resetUsernamesList();
        resetUid();
        resetUsername();
        setLocation('/login');
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
                    !isLogged && <Link href='/login'><a>Login</a></Link>
                }

                {
                    isLogged && <button onClick={handleLogout}>Logout</button>
                }
                
            </nav>
            <hr />
        </>
    )
}

export default NavBar