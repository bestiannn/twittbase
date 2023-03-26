import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import useFollowing from "../global/following";
import useUser from "../global/user";

const Tweets = ({ of = [""], username = "" }) => {
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const { usernamesList } = useFollowing();

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

        console.log(usernamesList)

        return () => data;

    }, [of]);

    return (
        <div className="pt-5 flex flex-col gap-5 px-1">
            {loading && <p>Loading...</p>}
            {!loading && messages && messages.map(({ id, uid, content }) => {
                return (
                    <div key={id} className="bg-ctp-base rounded-xl px-5 py-3">
                        <p className="font-bold mb-3">@{username}</p>
                        <p>{content}</p>
                    </div>
                )
            })}

        </div>
    )
}

export default Tweets