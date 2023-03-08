import { State } from "lib/types";
import { create } from "zustand";
import { persist } from 'zustand/middleware'

const useStore = create<State>()(
    persist(
        (set, get) => ({
            RANDOM_TEAMS: [],
            PLAYED_TEAMS: [],
            PLAYED: false,
            STEPS: null,
            POINTS: 0,
            IS_LOADING: false,
        }),
        {
            name: 'PLAYED',
            partialize: (state) => ({
                POINTS: state.POINTS, PLAYED_TEAMS: state.PLAYED_TEAMS
            }),
        }
    )
)

export default useStore
