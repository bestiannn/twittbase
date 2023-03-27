import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { useLocation } from 'wouter';
import { db } from '../firebase/config';
import useUser from '../global/user';

const Search = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [, setLocation] = useLocation();
  const { uid: currentUID } = useUser();

  const handleGoToProfile = (username) => {
    setLocation(`/user/${username}`);
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (search !== "") {
      const usersRef = collection(db, 'users');
      const usersSnap = await getDocs(usersRef);
      const users = usersSnap.docs.map(doc => doc.data());
      const filteredUsers = users.filter(user => user.username.includes(search) && user.uid !== currentUID);
      setUsers(filteredUsers);
    } else {
      const usersRef = collection(db, 'users');
      const usersSnap = await getDocs(usersRef);
      const users = usersSnap.docs.map(doc => doc.data());
      const filteredUsers = users.filter(user => user.uid !== currentUID);
      setUsers(filteredUsers);
    }
    setLoading(false);
  }

  return (
    <div>
      <h1 className='text-xl font-bold mb-5 mt-3'>Search</h1>
      <form onSubmit={handleSearch} className="flex flex-col gap-3">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="username" className="w-full rounded-xl text-ctp-crust px-3 py-1" />
        <button type='submit' className='border-2 rounded-xl px-5 py-1 w-full'>Search</button>
      </form>

      {
        loading && <p>Loading...</p>
      }
      {
        !loading && (
          <ul>
            {users.length === 0 && <p>No users found</p>}
            {users && users.map(({ uid, username }) => (
              <li key={uid} className="bg-ctp-base hover:bg-ctp-surface0 my-2 cursor-pointer" onClick={() => handleGoToProfile(username)}>{username}</li>
            ))}
          </ul>
        )
      }
    </div>
  )
}

export default Search