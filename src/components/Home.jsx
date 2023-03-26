import useFollowing from '../global/following';
import useUser from '../global/user';
import Tweets from './Tweets'

const Home = () => {
    const { uid } = useUser();
    const { followingList } = useFollowing();

    if (followingList.length === 0) {
        return <Tweets of={[uid, ...followingList]} />
    }
    return <Tweets of={[uid]} />
}

export default Home