import { create } from 'zustand'

const useFollowing = create(set => ({
    followingList: [],
    usernamesList : {},
    setFollowingList: (followingList) => set({ followingList }),
    setUsernamesList: (usernamesList) => set({ usernamesList }),
}))

export default useFollowing