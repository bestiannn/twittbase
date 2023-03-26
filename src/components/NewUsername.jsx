import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/config";
import useUser from "../global/user";

const NewUsername = () => {
    const [newUsername, setNewUsername] = useState("");
    const { uid, setUsername } = useUser();

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
    }

    return (
        <div className='min-h-screen container mx-auto'>
            <p>You don't have a username</p>

            <p>Set one up here</p>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <input type="text" className="text-ctp-crust" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                <button type="submit">Set username</button>
            </form>
        </div>
    )
}

export default NewUsername