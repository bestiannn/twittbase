import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Redirect, Route, Switch } from 'wouter';
import { Home, Login, NavBar, Profile, Register, Search, LoadingPage } from './components';
import { auth } from './firebase/config';
import useFollowing from './global/following';
import useUser from './global/user';
import { createUserDoc, getFollowingList, getUserInfo } from './hooks/firebase';

const App = () => {
  const [isLogged] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);
  const { username, uid, setUid, setUsername } = useUser();
  const { followingList, usernamesList, setFollowingList, setUsernamesList } = useFollowing();

  useEffect(() => {
    if (isLogged) {
      (async () => {
        const { userExists, userData } = await getUserInfo(isLogged.uid);

        if (userExists) {
          const { username, following } = userData;

          setUsername(username);
          setFollowingList(following?.length > 0 ? following : []);
        } else {
          // create document in users if it doesn't exist
          await createUserDoc(isLoading.uid);
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
        const newFollowingList = await getFollowingList(uid, username, followingList);
        setUsernamesList(newFollowingList);
      })();
    }
  }, [followingList, usernamesList]);

  return (
    <>
      {
        isLoading ? <LoadingPage /> : (
          <div className='bg-ctp-crust text-ctp-text'>
            <div className='min-h-screen container mx-auto'>
              <div className="w-full xl:w-1/2 mx-auto">
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
          </div>
        )
      }
    </>
  )
}

export default App