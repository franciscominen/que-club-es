import api from "@/pages/api/api";
import { Actions, ITeam } from "lib/types";
import useStore from "./state";

const useActions = () => {

    const fetchTeams = () => {
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
        return useStore.setState(state => ({ ...state, POINTS: state.POINTS + 1}));
    }

    return {
        fetchTeams,
        incrementPoints
    }
}


export default useActions