import { collection, deleteDoc, doc, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { BsTrashFill } from "react-icons/bs";
import useFollowing from "../global/following";
import useUser from "../global/user";

const Tweets = ({ of = [""], username }) => {
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const { usernamesList } = useFollowing();
    const { username: currentUser } = useUser();

    const [currentTweetActive, setCurrentTweetActive] = useState(null);

    const handleHover = (id) => {
        setCurrentTweetActive(id);
    }

    const handleLeave = () => {
        setCurrentTweetActive(null);
    }

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "tweets", id));
    }

    useEffect(() => {
        const q = query(
            collection(db, "tweets"),
            where("uid", "in", of),
            orderBy("createdAt", "desc"),
            limit(50)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
            let messagesList = [];
            QuerySnapshot.forEach((doc) => {
                messagesList.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messagesList);
            setLoading(false);
        });

        return () => data;

    }, [of]);

    return (
        <div className="pt-5 flex flex-col gap-5 px-1">
            {loading && <p>Loading...</p>}
            {!loading && messages && messages.map(({ id, uid, content }) => {
                return (
                    <div key={id} className="bg-ctp-base hover:bg-ctp-surface0 rounded-xl px-5 py-3" onMouseEnter={() => handleHover(id)} onMouseLeave={handleLeave}>
                        <div className="flex justify-between">
                            <p className="font-bold mb-3">@{username ? username : usernamesList[uid]}</p>
                            {
                                currentUser === usernamesList[uid] && currentTweetActive === id && <BsTrashFill className="cursor-pointer text-ctp-text hover:text-ctp-subtext0" onClick={() => handleDelete(id)} />
                            }
                        </div>
                        <p>{content}</p>
                    </div>
                )
            })}

        </div>
    )
}

export default Tweets