import { create } from 'zustand'

const useUser = create(set => ({
    uid: null,
    username: null,

    setUid: (uid) => set({ uid }),
    setUsername: (username) => set({ username }),
}))

export default useUser