import { ITeam } from "lib/types";
import { useEffect, useState } from "react";
import Papa from "papaparse";

const Testing = () => {
/*   const teamsUrl = process.env.NEXT_PUBLIC_API_ALL_TEAMS;
  const [teams, setTeams] = useState([]);

  console.log(teams.filter(team => {
    return team.difficultyLevel === 1
  }));
  

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
{/*       <div style={{ display: "flex", flexWrap: 'wrap', gap: '20px' }}>
        {teams.map((team) => {
          return (
            <div key={team.id}>
              <h3>{team.name}</h3>
              <img src={team.img} alt="" style={{maxWidth: "130px", maxHeight: '140px', objectFit: 'contain' }} />
              <h3>{team.difficultyLevel}</h3>

            </div>
          );
        })}
      </div> */}
    </>
  );
};

export default Testing;
