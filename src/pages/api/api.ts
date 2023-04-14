import { database } from "lib/firebase";
import firebase from 'firebase/compat/app';

import { ITeam, User } from "lib/types";
import Papa from "papaparse";
import axios from "axios";

type GetUserResponse = {
    success: boolean;
    message: string;
    user?: User;
    data?: any;
    status?: number;
    id?: string;
    username?: string;
    role?: string;
};

const api = {
    getAllTeams: async () => {
        const teamsUrl = process.env.NEXT_PUBLIC_API_ALL_TEAMS;
        const res = await fetch(`${teamsUrl}`);
        const data = await res.text();
        const teams: ITeam[] = Papa.parse<ITeam>(data, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
        }).data;

        return teams;
    },
    setFiveRandomTeams: async () => {
        const teamsUrl = process.env.NEXT_PUBLIC_API_ALL_TEAMS;
        const res = await fetch(`${teamsUrl}`);
        const data = await res.text();
        const teams: ITeam[] = Papa.parse<ITeam>(data, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
        }).data;

        const selectedTeams: ITeam[] = [];
        const difficultyLevels: string[] = [];

        while (selectedTeams.length < 5 && teams.length > 0) {
            const randomIndex = Math.floor(Math.random() * teams.length);
            const randomTeam = teams[randomIndex];
            teams.splice(randomIndex, 1);

            if (
                !selectedTeams.includes(randomTeam) &&
                !difficultyLevels.includes(randomTeam.difficultyLevel)
            ) {
                selectedTeams.push(randomTeam);
                difficultyLevels.push(randomTeam.difficultyLevel);
            }
        }

        try {
            await database.collection("TEAMS_OF_THE_DAY").add({
                teams: selectedTeams,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
        } catch (error) {
            console.log("Error:", error);
        }
    },
    getFiveRandomTeams: (callback: (teams: ITeam[]) => void) => {
        database
            .collection('TEAMS_OF_THE_DAY')
            .orderBy('createdAt', 'desc')
            .limit(1)
            .onSnapshot(snapshot => callback(
                snapshot.docs.map(doc => ({ ...(doc.data() as ITeam), id: doc.id }))
            ))
    },
    getUser: async (username: string, password: string): Promise<GetUserResponse> => {
        try {
            const response = await axios.get('/api/user', {
                params: {
                    username: username,
                    password: password,
                },
            });
            return { success: true, message: 'Usuario obtenido correctamente', user: response.data };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'No se pudo obtener el usuario' };
        }
    },
}

export default api
