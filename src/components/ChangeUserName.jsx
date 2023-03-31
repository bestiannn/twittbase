import { MdCancel, MdOutlineAccountCircle } from "react-icons/md";
import { useState } from "react";
import { useLocation } from "wouter";
import {changeUsername} from "../hooks/firebase";
import useUser from "../global/user";
import { BsCheckCircleFill } from "react-icons/bs";

const ChangeUserName = () => {
    const [showForm, setShowForm] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const { uid, setUsername } = useUser();
    const [, setLocation] = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userChanged = await changeUsername(uid, newUsername);
        if (!userChanged) {
            return;
        }
        setUsername(newUsername);
        setNewUsername('');
        setShowForm(false);

        setLocation('/user/' + newUsername);
    }

    return (
        <div className="mt-5 mb-20">
            {
                !showForm && (
                    <button onClick={() => setShowForm(true)} className="border-2 rounded-xl px-5 py-1 w-full flex justify-center gap-3">
                        <MdOutlineAccountCircle className="text-2xl" />
                        Change username
                    </button>
                )
            }

            {
                showForm && (
                    <form className="flex flex-col gap-3 my-5" onSubmit={handleSubmit}>
                        <input type="text" placeholder="New username" className="w-full rounded-xl text-ctp-crust px-3 py-2" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                        <div className="flex gap-5">
                            <button onClick={() => setShowForm(false)} className="border-2 rounded-xl px-5 py-1 w-full flex justify-center gap-3"><MdCancel className="text-xl mt-px" />Cancel</button>
                            <button type="submit" className="border-2 rounded-xl px-5 py-1 w-full flex justify-center gap-3"><BsCheckCircleFill className="mt-1" />Change</button>
                        </div>
                    </form>
                )
            }
        </div>
    )
}

export default ChangeUserName