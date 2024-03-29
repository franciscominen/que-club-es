import api from "@/pages/api/api";
import { ITeam } from "lib/types";
import { useCallback } from "react";
import useStore from "./state";

const useActions = () => {
    const RANDOM_TEAMS = useStore((state) => state.RANDOM_TEAMS);
    const PLAYED_TEAMS = useStore((state) => state.PLAYED_TEAMS);
    const SCOREBOARD = useStore((state) => state.SCOREBOARD);

    const fetchAllTeams = useCallback(async () => {
        useStore.setState({ IS_LOADING: true });
        try {
            const teams = await api.getAllTeams();
            useStore.setState((state) => ({ ...state, ALL_TEAMS: teams.sort(() => Math.random() - 0.5) }));
            useStore.setState({ IS_LOADING: false });
        } catch (error) {
            console.log('API Error:', error);
            useStore.setState({ IS_LOADING: false });
        }
    }, []);

    const fetchFiveTeams = () => {
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

    const nextStep = () => {
        return useStore.setState(state => ({ ...state, STEPS: state.STEPS + 1 }));
    }

    const incrementPoints = () => {
        return useStore.setState(state => ({ ...state, POINTS: state.POINTS + 1 }));
    }

    const incrementArcadePoints = () => {
        return useStore.setState(state => ({ ...state, ARCADE_STEPS: state.ARCADE_STEPS + 1 }));
    }

    const resetGame = () => {
        useStore.setState(state => ({ ...state, POINTS: 0 }));
        useStore.setState(state => ({ ...state, STEPS: 0 }));
        useStore.setState(state => ({ ...state, SCOREBOARD: [] }));
    }

    const resetArcadePoints = () => {
        return useStore.setState(state => ({ ...state, ARCADE_STEPS: 0 }));
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
            return useStore.setState(state => ({ ...state, PLAYED: true }));
        } else {
            return useStore.setState(state => ({ ...state, PLAYED: false }));
        }
    }

    const updateScoreboard = (value: string) => {
        return useStore.setState(state => ({ ...state, SCOREBOARD: SCOREBOARD.concat(value) }));
    }

    const resetScoreboard = () => {
        return useStore.setState(state => ({ ...state, SCOREBOARD: [] }));
    }

    return {
        fetchFiveTeams,
        nextStep,
        incrementPoints,
        setToPlayed,
        setPlayedTeams,
        checkIsPlayed,
        resetGame,
        updateScoreboard,
        resetScoreboard,
        fetchAllTeams,
        incrementArcadePoints,
        resetArcadePoints,
    }
}


export default useActions