import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../firebase/config";

const createUserDoc = async (uid) => {
    await setDoc(doc(db, 'users', uid), {
        uid: uid,
        username: uid,
        following: []
    });
}

const getFollowingList = async (uid, username, followingList) => {
    const q = query(
        collection(db, "users"),
        where("uid", "in", followingList.length > 0 ? followingList : [''])
    );
    const querySnapshot = await getDocs(q);
    const usernames = { [uid]: username };
    querySnapshot.forEach((doc) => {
        usernames[doc.data().uid] = doc.data().username;
    });
    return usernames;
}

const getUserInfo = async (uid) => {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    return {userExists: docSnap.exists(), userData:docSnap.data()}
}

const findUsers = async (search) => {
    const usersRef = collection(db, 'users');
    const usersSnap = await getDocs(usersRef);
    const users = usersSnap.docs.map(doc => doc.data());
    return users.filter(user => user.username.includes(search));
}

const allUsers = async () => {
    const usersRef = collection(db, 'users');
    const usersSnap = await getDocs(usersRef);
    const users = usersSnap.docs.map(doc => doc.data());
    return users;
}

const changeUsername = async (uid, newUsername) => {
    if (newUsername.length === 0 || newUsername.length > 15 || newUsername.includes(' ')) {
        alert('Username must be between 1 and 15 characters and cannot contain spaces');
        return false;
    }
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', newUsername));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
        alert('Username already taken');
        return false;
    }

    await setDoc(doc(db, 'users', uid), {
        username: newUsername
    }, { merge: true });

    return true;
}

const setFollow = async (uid, userUID, isFollowing) => {
    await setDoc(doc(db, 'users', uid), {
        following: isFollowing ? arrayRemove(userUID) : arrayUnion(userUID)
    }, { merge: true });
}

export { createUserDoc, getFollowingList, getUserInfo, findUsers, allUsers, changeUsername, setFollow };