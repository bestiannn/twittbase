import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation } from 'wouter';
import { auth, db } from '../firebase/config';
import useUser from '../global/user';
import ChangeUserName from './ChangeUserName';
import Follow from './Follow';
import Tweets from './Tweets'

const Profile = ({ usernameProfile }) => {
  const [isLogged] = useAuthState(auth);
  const { uid, username } = useUser();
  const [newTweet, setNewTweet] = useState('');
  const [uidCurrentUser, setUidCurrentUser] = useState('');
  const [, setLocation] = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTweet.length === 0 || uid === null || newTweet.length > 280) return;
    await addDoc(collection(db, 'tweets'), {
      uid,
      createdAt: serverTimestamp(),
      content: newTweet,
    });
    setNewTweet('');
  }

  useEffect(() => {

    if (usernameProfile == "null") {
      setLocation('/');
      return;
    }

    const q = query(
      collection(db, "users"),
      where("username", "==", usernameProfile)
    );
    const getUid = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUidCurrentUser(doc.data().uid);
      });
    }
    getUid();
  }, []);

  return (
    <div className='pb-10'>
      <h2 className='text-2xl font-bold my-5'>@{usernameProfile}</h2>

      {
        isLogged && username === usernameProfile && (
          <ChangeUserName />
        )
      }

      {
        isLogged && username === usernameProfile && (
          <form onSubmit={handleSubmit} className='flex flex-col gap-3 mb-5'>
            <textarea rows="3" className='w-full rounded-xl text-ctp-crust px-3 py-2' maxLength={280} placeholder="What's happening?" value={newTweet} onChange={(e) => setNewTweet(e.target.value)} />
            <button type="submit" className='border-2 rounded-xl px-5 py-1 w-full'>Tweet</button>
          </form>
        )
      }
      {
        isLogged && username !== usernameProfile && (
          <Follow userUID={uidCurrentUser} />
        )
      }

      <Tweets of={[uidCurrentUser]} username={usernameProfile} />

    </div>
  )
}

export default Profile