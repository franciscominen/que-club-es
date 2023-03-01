import { State } from "lib/types";
import { create } from "zustand";

const useStore = create<State>()((set) => ({
    TEAMS: [],
    RANDOM_TEAMS: [],
    STEPS: null,
    POINTS: 0,
    IS_LOADING: false,
}))

export default useStore