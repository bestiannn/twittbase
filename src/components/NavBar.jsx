import { FiLogIn, FiLogOut, FiUser } from 'react-icons/fi';
import { BsSearch } from 'react-icons/bs';
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

    const handleLogout = async () => {
        await auth.signOut();
        resetFollowingList();
        resetUsernamesList();
        resetUid();
        resetUsername();
        setLocation('/login');
    }

    return (
        <>
            <nav className='flex justify-between text-lg font-bold px-5 py-2'>

                <Link href='/'>
                    <a title='TwittBase' className='text-xl'>TwittBase</a>
                </Link>

                <div className="flex gap-5 text-2xl">
                    {
                        isLogged && (
                            <Link href={`/user/${username}`}>
                                <FiUser className='cursor-pointer' title='My profile' />
                            </Link>
                        )
                    }

                    <Link href='/search'>
                        <BsSearch className='cursor-pointer' title='Search' />
                    </Link>

                    {
                        !isLogged && <Link href='/login' title='Login'><FiLogIn className="text-cpt-text cursor-pointer" /></Link>
                    }

                    {
                        isLogged && <button onClick={handleLogout} title='Logout'><FiLogOut className="text-cpt-text cursor-pointer" /></button>
                    }
                </div>

            </nav>
            <hr />
        </>
    )
}

export default NavBar