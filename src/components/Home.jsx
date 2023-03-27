import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import useFollowing from '../global/following';
import useUser from '../global/user';
import Tweets from './Tweets'

const Home = () => {
    const [isLogged] = useAuthState(auth);
    const { uid, username } = useUser();
    const { followingList } = useFollowing();

    if (!isLogged) return;
    
    if (followingList.length > 0) {
        return <Tweets of={[uid, ...followingList]} />
    }
    return <Tweets of={[uid]} username={username} />
}

export default Home