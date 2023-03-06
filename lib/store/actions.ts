import api from "@/pages/api/api";
import { Actions, ITeam } from "lib/types";
import useStore from "./state";

const useActions = () => {
    const RANDOM_TEAMS = useStore((state) => state.RANDOM_TEAMS);
    const PLAYED_TEAMS = useStore((state) => state.PLAYED_TEAMS);

    const fetchTeams = async () => {
        useStore.setState({ IS_LOADING: true });
        try {
            return api.getFiveRandomTeams((teams: ITeam[]) => {
                useStore.setState((state) => ({ ...state, RANDOM_TEAMS: teams[0]?.teams }))
                useStore.setState({ IS_LOADING: false });
            });

        } catch {
            console.log('Firestore Error');
        }
    }

    const incrementPoints = () => {
        return useStore.setState(state => ({ ...state, POINTS: state.POINTS + 1 }));
    }

    const setToPlayed = () => {
        return useStore.setState(state => ({ ...state, PLAYED: true }));
    }

    const setPlayedTeams = (randomTeams: ITeam[]) => {
        return useStore.setState(state => ({ ...state, PLAYED_TEAMS: randomTeams }));
    }

    const checkIsPlayed = () => {
        const array1Ids = RANDOM_TEAMS.map((obj) => obj.id).sort();
        const array2Ids = PLAYED_TEAMS.map((obj) => obj.id).sort();

        if (JSON.stringify(array1Ids) === JSON.stringify(array2Ids)) {
            return true;
        } else {
            return false;
        }
    }

    return {
        fetchTeams,
        incrementPoints,
        setToPlayed,
        setPlayedTeams,
        checkIsPlayed
    }
}


export default useActions