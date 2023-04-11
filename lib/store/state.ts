import { State } from "lib/types";
import { create } from "zustand";
import { persist } from 'zustand/middleware'

const useStore = create<State>()(
    persist(
        (set) => ({
            RANDOM_TEAMS: [],
            PLAYED_TEAMS: [],
            PLAYED: false,
            STEPS: 0,
            POINTS: 0,
            IS_LOADING: false,
            SCOREBOARD: [],
        }),
        {
            name: 'PLAYED',
            partialize: (state) => ({
                POINTS: state.POINTS, PLAYED_TEAMS: state.PLAYED_TEAMS, SCOREBOARD: state.SCOREBOARD, STEPS: state.STEPS
            }),
        }
    )
)

export default useStore
