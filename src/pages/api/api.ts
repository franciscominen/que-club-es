import { database } from "lib/firebase";
import { ITeam } from "lib/types";
import Papa from "papaparse";

const api = {
    teams: {
        fetchFiveRandomTeams: async () => {
            const res = await fetch(
                "https://docs.google.com/spreadsheets/d/e/2PACX-1vRzKkddmHZtcXKO6ZZ8wIZqqu7xb0gM-euRHEMeOTS7lIBKdzWMbubVmsYrB1jMbrlySqk1we4F6_QH/pub?gid=0&output=csv"
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
                        randomArray
                    });

                console.log('Created!');

            } catch {
                console.log("error");
            }
        },

    }
}

export default api