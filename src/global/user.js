import { create } from 'zustand'

const useUser = create(set => ({
    uid: null,
    username: null,

    setUid: (uid) => set({ uid }),
    setUsername: (username) => set({ username }),

    resetUid: () => set({ uid: null }),
    resetUsername: () => set({ username: null }),
}))

export default useUser