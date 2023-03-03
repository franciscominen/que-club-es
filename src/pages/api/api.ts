import { database } from "lib/firebase";
import firebase from 'firebase/compat/app';

import { ITeam } from "lib/types";
import Papa from "papaparse";

const api = {
    setFiveRandomTeams: async () => {

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ALL_TEAMS}`
        );
        const data = await res.text();
        const teams = await new Promise<ITeam[]>((resolve, reject) => {
            Papa.parse<ITeam>(data, {
                header: true,
                complete: (result) => resolve(result.data),
                error: reject,
            });
        });

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

        try {
            await database
                .collection("TEAMS_OF_THE_DAY")
                .doc()
                .set({
                    teams: [...randomArray],
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });

            console.log('Created!');

        } catch {
            console.log("error");
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
    }
}



export default api