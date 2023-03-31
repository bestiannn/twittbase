import { useState } from 'react'
import { useLocation } from 'wouter';
import { allUsers, findUsers } from '../hooks/firebase';
import { BiSearch } from 'react-icons/bi';

const Search = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [, setLocation] = useLocation();

  const handleGoToProfile = (username) => {
    setLocation(`/user/${username}`);
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (search !== "") {
      const usersFinded = await findUsers(search);
      setUsers(usersFinded);
    } else {
      const usersFinded = await allUsers();
      setUsers(usersFinded);
    }
    setLoading(false);
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-5 mt-3'>Search</h1>
      <form onSubmit={handleSearch} className="flex flex-col gap-3 my-5">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Write a username for search" className="w-full rounded-xl text-ctp-crust px-3 py-1" />
        <button type='submit' className='border-2 rounded-xl px-5 py-1 w-full flex justify-center gap-3'><BiSearch className="text-xl mt-px" />Search</button>
      </form>

      {
        loading && <p>Loading...</p>
      }
      {
        !loading && (
          <ul>
            {users.length === 0 && <p>No users found</p>}
            {users && users.map(({ uid, username }) => (
              <li key={uid} className="bg-ctp-base hover:bg-ctp-surface0 my-3 cursor-pointer py-2 px-3 rounded-xl" onClick={() => handleGoToProfile(username)}>@{username}</li>
            ))}
          </ul>
        )
      }
    </div>
  )
}

export default Search