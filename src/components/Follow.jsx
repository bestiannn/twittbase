import { arrayRemove, arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import useFollowing from "../global/following";
import useUser from "../global/user";

const Follow = ({ userUID }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const { uid } = useUser();
    const { followingList, setFollowingList } = useFollowing();

    const handleFollow = async () => {
        setIsFollowing(!isFollowing);
        await setDoc(doc(db, 'users', uid), {
            following: isFollowing ? arrayRemove(userUID) : arrayUnion(userUID)
        }, { merge: true });
        setFollowingList(isFollowing ? followingList.filter(followingUID => followingUID !== userUID) : [...followingList, userUID]);
    }

    useEffect(() => {
        (async () => {
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            setIsFollowing(docSnap.data().following.includes(userUID));
        })();
    }, [uid, userUID]);

    return (
        <button className='border-2 rounded-xl px-5 py-1 w-full' onClick={handleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
    )
}

export default Follow