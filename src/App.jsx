import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Redirect, Route, Switch } from 'wouter';
import Home from './components/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import Register from './components/Register';
import Search from './components/Search';
import { auth, db } from './firebase/config';
import useFollowing from './global/following';
import useUser from './global/user';

const App = () => {
  const [isLogged] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);
  const { username, uid, setUid, setUsername } = useUser();
  const { followingList, usernamesList, setFollowingList, setUsernamesList } = useFollowing();

  useEffect(() => {
    if (isLogged) {
      (async () => {
        const docRef = doc(db, 'users', isLogged.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUsername(docSnap.data().username);
          setFollowingList(docSnap.data().following?.length > 0 ? docSnap.data().following : []);
        } else {
          // create document in users if it doesn't exist
          await setDoc(doc(db, 'users', isLogged.uid), {
            uid: isLogged.uid,
            username: isLogged.uid,
            following: []
          });
          setUsername(isLogged.uid);
        }

      })();
      setUid(isLogged.uid);
    }
    setIsLoading(false);
  }, [isLogged]);

  useEffect(() => {
    if (isLogged) {
      (async () => {
        const q = query(
          collection(db, "users"),
          where("uid", "in", followingList.length > 0 ? followingList : [''])
        );
        const querySnapshot = await getDocs(q);
        const usernames = { [uid]: username };
        querySnapshot.forEach((doc) => {
          usernames[doc.data().uid] = doc.data().username;
        }
        );
        setUsernamesList(usernames);
      })();
    }
  }, [followingList, usernamesList]);

  return (
    <>
      {
        isLoading ? (
          <div className='bg-ctp-crust text-ctp-text'>
            <div className='min-h-screen container mx-auto grid place-content-center'>
              <h2 className='text-3xl font-bold'>Loading...</h2>
            </div>
          </div>
        ) : (
          <div className='bg-ctp-crust text-ctp-text'>
            <div className='min-h-screen container mx-auto'>
              <NavBar />
              <Switch>
                <Route path='/'><Home /></Route>
                <Route path='/user/:usernameProfile'>{({ usernameProfile }) => <Profile usernameProfile={usernameProfile} />}</Route>
                <Route path='/search'><Search /></Route>
                <Route path='/login'><Login /></Route>
                <Route path='/register'><Register /></Route>
                <Redirect to='/' />
              </Switch>
            </div>
          </div>
        )
      }
    </>
  )
}

export default App