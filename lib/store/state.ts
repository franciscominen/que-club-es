import { State } from "lib/types";
import { create } from "zustand";
import { persist } from 'zustand/middleware'

const useStore = create<State>()(
    persist(
        (set, get) => ({
            TEAMS: [],
            RANDOM_TEAMS: [],
            PLAYED_TEAMS: [],
            STEPS: null,
            POINTS: 0,
            IS_LOADING: false,
            PLAYED: false
        }),
        {
            name: 'PLAYED',
            partialize: (state) => ({
                PLAYED: state.PLAYED, POINTS: state.POINTS, PLAYED_TEAMS: state.PLAYED_TEAMS,
            }),
        }
    )
)

export default useStore
