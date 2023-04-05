import styled from "styled-components";
import { countdownBar } from "@/styles/animations";

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

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  };

  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["˽", "Z", "X", "C", "V", "B", "N", "M", "<"],
  ];

  return (
    <Wrapper>
      <div style={{ height: "67px" }}>
        <TeamNameInput
          type="text"
          value={teamName.toLocaleLowerCase()}
          placeholder="¿Qué club e'?"
          onChange={handleOnChange}
        />
        <CountdownBar />
      </div>
      {keys.map((row, i) => (
        <KeysWrapper key={i}>
          {row.map((key, j) => (
            <KeyButton key={j} value={key} onClick={handleKeyClick}>
              {key}
            </KeyButton>
          ))}
        </KeysWrapper>
      ))}
    </Wrapper>
  );
};

export default InputAndKeyboard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TeamNameInput = styled.input`
  color: var(--dark);
  background-color: #ffffff42;
  width: 100%;
  font-size: 24px;
  padding: 4px;
  border-radius: 8px;
  border: 4px solid var(--light);
  text-align: center;
  text-transform: capitalize;
  margin-bottom: 8px;
  position: relative;
  z-index: 2;
  &:focus {
    outline: none;
  }
`;

const CountdownBar = styled.figure`
  background-color: var(--light);
  width: 99%;
  margin: 0 auto;
  height: 44px;
  position: relative;
  bottom: 3.5em;
  z-index: 1;
  animation: ${countdownBar} 15s linear;
  transform-origin: center left;
`;

const KeysWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 8px;
`;

const KeyButton = styled.button`
  width: 100%;
  height: 48px;
  color: var(--light);
  background-color: transparent;
  border: 2px solid var(--light);
  border-radius: 4px;
  font-size: 16px;
  font-family: var(--alternativeFont);
  font-weight: 500;
  transition: all .1s;
  &:hover {
    background-color: var(--light);
    color: var(--dark);
  }
`;
