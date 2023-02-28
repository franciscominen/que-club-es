import api from "./api";

export default async function Home() {
  const teams = await api.teams.fetch();

  return (
    <main>
      <h1>Hola</h1>
      <ul>
        {teams.map((team) => {
          return (
            <li key={team.id}>
              <img src={team.img} alt="" style={{width: '60px'}}/>
              <p>{team.name}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
