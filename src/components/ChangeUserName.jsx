import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useState } from "react";
import { useLocation } from "wouter";
import { db } from "../firebase/config";
import useUser from "../global/user";

const ChangeUserName = () => {
    const [showForm, setShowForm] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const { uid, setUsername } = useUser();
    const [, setLocation] = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', newUsername));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
            alert('Username already taken');
            return;
        }

        await setDoc(doc(db, 'users', uid), {
            username: newUsername
        }, { merge: true });
        setUsername(newUsername);
        setNewUsername('');
        setShowForm(false);
        
        setLocation('/user/' + newUsername);
    }

    return (
        <div className="my-5">
            <button onClick={() => setShowForm(!showForm)} className="border-2 rounded-xl px-5 py-1 w-full">
                Change username
            </button>

            {
                showForm && (
                    <form className="flex flex-col gap-3 my-5" onSubmit={handleSubmit}>
                        <input type="text" placeholder="New username" className="w-full rounded-xl text-ctp-crust px-3 py-2" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                        <button type="submit" className="border-2 rounded-xl px-5 py-1 w-full">Change</button>
                    </form>
                )
            }
        </div>
    )
}

export default ChangeUserName