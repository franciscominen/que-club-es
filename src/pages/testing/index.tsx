import { ITeam } from "lib/types";
import { useEffect, useState } from "react";
import Papa from "papaparse";

const Testing = () => {
/*   const teamsUrl = process.env.NEXT_PUBLIC_API_ALL_TEAMS;
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${teamsUrl}`);
      const data = await res.text();
      const teams: ITeam[] = Papa.parse<ITeam>(data, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      }).data;

      return setTeams(teams);
      // return console.log(teams);
    };
    fetchData();
  }, []); */

  return (
    <>
{/*       {teams.map((team) => {
        return (
          <div key={team.id}>
            <h3>{team.name}</h3>
            <img src={team.img} alt="" style={{ width: "150px" }} />
          </div>
        );
      })} */}
    </>
  );
};

export default Testing;
