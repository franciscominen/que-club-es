import api from "@/pages/api/api";
import { Actions, ITeam } from "lib/types";
import useStore from "./state";

const useActions = () => {

    /* const getTeams = async () => {
        useStore.setState(state => ({ ...state, IS_LOADING: true }));
        const teams = await api.teams.fetch();

        return useStore.setState(state => ({ ...state, TEAMS: teams, IS_LOADING: false }));
    } */

    const getLogos = async () => {
        useStore.setState(state => ({ ...state, IS_LOADING: true }));

        const teams = await api.teams.fetch();
        const randomArray: ITeam[] = [];
        let difficultyLevels: any = [];

        while (randomArray.length < 5) {
            const randomIndex = Math.floor(Math.random() * teams.length);
            const randomElement = teams[randomIndex];

            if (!randomArray.includes(randomElement) && !difficultyLevels.includes(randomElement.difficultyLevel)) {
                randomArray.push(randomElement);
                difficultyLevels.push(randomElement.difficultyLevel);
            }
        }

        return useStore.setState(state => ({ ...state, RANDOM_TEAMS: randomArray, IS_LOADING: false }));
    }

    const incrementPoints = () => {
        return useStore.setState(state => ({ ...state, POINTS: state.POINTS + 1}));
    }

    return {
        getTeams,
        getLogos,
        incrementPoints
    }
}


export default useActions