import { State } from "lib/types";
import { create } from "zustand";
import { persist } from 'zustand/middleware'

const useStore = create<State>()(
    persist(
        (set) => ({
            ALL_TEAMS: [],
            RANDOM_TEAMS: [],
            PLAYED_TEAMS: [],
            PLAYED: false,
            STEPS: 0,
            ARCADE_STEPS: 0,
            POINTS: 0,
            IS_LOADING: false,
            SCOREBOARD: [],
            APP_SOUND_MUTED: true,
            SHOW_SOUND_MODAL: true,
        }),
        {
            name: 'PLAYED',
            partialize: (state) => ({
                POINTS: state.POINTS, PLAYED_TEAMS: state.PLAYED_TEAMS, SCOREBOARD: state.SCOREBOARD, STEPS: state.STEPS, ARCADE_STEPS: state.ARCADE_STEPS
            }),
        }
    )
)

export default useStore
