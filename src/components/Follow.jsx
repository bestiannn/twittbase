import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import useFollowing from "../global/following";
import useUser from "../global/user";
import { setFollow } from "../hooks/firebase";

const Follow = ({ userUID }) => {
    const [isLogged] = useAuthState(auth);
    const [isFollowing, setIsFollowing] = useState(false);
    const { uid } = useUser();
    const { usernamesList, followingList, setFollowingList } = useFollowing();

    const handleFollow = async () => {
        setIsFollowing(!isFollowing);
        await setFollow(uid, userUID, isFollowing);
        setFollowingList(isFollowing ? followingList.filter((uid) => uid !== userUID) : [...followingList, userUID]);
    }

    useEffect(() => {
        if (isLogged) {
            setIsFollowing(followingList.includes(userUID));
        }
    }, [followingList, usernamesList]);

    return (
        <button className='border-2 rounded-xl px-5 py-1 w-full bg-ctp-crust hover:bg-ctp-mantle' onClick={handleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
    )
}

export default Follow