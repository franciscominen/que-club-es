type Props = {
  teamName: string;
  setTeamName: React.Dispatch<React.SetStateAction<string>>;
};

const InputAndKeyboard = ({ teamName, setTeamName }: Props) => {
  const handleKeyClick = (e: any) => {
    if (e.target.value === "<") {
      setTeamName(teamName.slice(0, -1));
    } else if (e.target.value === "˽") {
      setTeamName(teamName + " ");
    } else {
      setTeamName(teamName + e.target.value);
    }
  };

  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["˽", "Z", "X", "C", "V", "B", "N", "M", "<"],
  ];

  return (
    <div>
      <input type="text" value={teamName} />
      {keys.map((row, i) => (
        <div key={i}>
          {row.map((key, j) => (
            <button key={j} value={key} onClick={handleKeyClick}>
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default InputAndKeyboard;
