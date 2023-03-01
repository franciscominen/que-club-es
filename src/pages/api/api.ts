import { ITeam } from "lib/types";
import Papa from "papaparse";

const api = {
    teams: {
        fetch: async () => {
            const res = await fetch(
                "https://docs.google.com/spreadsheets/d/e/2PACX-1vRzKkddmHZtcXKO6ZZ8wIZqqu7xb0gM-euRHEMeOTS7lIBKdzWMbubVmsYrB1jMbrlySqk1we4F6_QH/pub?gid=0&output=csv"
            );
            const data = await res.text();
            const parsed = new Promise<ITeam[]>((resolve, reject) => {
                Papa.parse<ITeam>(data, {
                    header: true,
                    complete: (result) => resolve(result.data),
                    error: reject,
                });
            });

            return parsed;
        }
    }
}

export default api