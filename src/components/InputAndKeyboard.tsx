import styled from "styled-components";
import { blink, countdownBar, typing } from "@/styles/animations";
import useStore from "lib/store/state";
import Image from "next/image";
import { useEffect, useRef } from "react";

type Props = {
  teamName: string;
  setTeamName: React.Dispatch<React.SetStateAction<string>>;
};

const InputAndKeyboard = ({ teamName, setTeamName }: Props) => {
  const STEPS = useStore((state) => state.STEPS);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyClick = (e: any) => {
    e.preventDefault();
    const clickedValue = e.currentTarget.value;

    if (clickedValue === "<") {
      setTeamName((prevTeamName) => prevTeamName.slice(0, -1));
    } else if (clickedValue === "˽") {
      setTeamName((prevTeamName) => prevTeamName + " ");
    } else {
      setTeamName((prevTeamName) => prevTeamName + clickedValue);
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

  const handleKeyRender = (key: string): JSX.Element | string => {
    let keyRender: JSX.Element | string = key;
    if (key === "˽") {
      keyRender = (
        <Image
          src="/assets/space.svg"
          alt="˽"
          width={22}
          height={22}
          style={{ position: "relative", top: "8px" }}
          priority={true}
        />
      );
    } else if (key === "<") {
      keyRender = (
        <Image
          src="/assets/backspace.svg"
          alt="<"
          width={22}
          height={22}
          style={{ position: "relative", top: "2px" }}
          priority={true}
        />
      );
    }
    return keyRender;
  };

  /*   useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // Dispositivo móvil
      inputRef.current?.blur();
    } else {
      // Escritorio
      inputRef.current?.focus();
    }
  }, []); */

  return (
    <Wrapper>
      <InputContainer>
        <TeamNameInput
          autoFocus
          type="text"
          value={teamName.toLocaleLowerCase()}
          onChange={handleOnChange}
          maxLength={45}
          setColor={!teamName.length}
          ref={inputRef}
        />
        <CountdownBar key={STEPS} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {!teamName.length && (
            <Placeholder key={STEPS}>¿Qué club e’?</Placeholder>
          )}
        </div>
      </InputContainer>
      {keys.map((row, i) => (
        <KeysWrapper key={i}>
          {row.map((key, j) => (
            <KeyButton key={j} value={key} onClick={handleKeyClick}>
              {handleKeyRender(key)}
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

const InputContainer = styled.div`
  height: 68px;

  @media (max-width: 376px) {
    height: 54px;
  }
`;

const TeamNameInput = styled.input<{ setColor: boolean }>`
  color: ${(props) => (props.setColor ? `transparent` : `var(--dark)`)};
  background-color: #ffffff70;
  width: 100%;
  font-size: 24px;
  padding: 4px;
  border-radius: 8px;
  border: 4px solid var(--light);
  text-align: center;
  text-transform: capitalize;
  margin-bottom: 8px;
  position: relative;
  z-index: 3;
  &:focus {
    outline: none;
  }

  @media (max-width: 376px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    pointer-events: none;
  }
`;

const Placeholder = styled.h2`
  width: 10.2ch;
  padding: 0 2px;
  animation: ${typing} 3s steps(20), ${blink} 1s step-end infinite;
  white-space: nowrap;
  overflow: hidden;
  border-right: 1px solid;
  z-index: 2;
  height: 35px;
  position: relative;
  bottom: 4em;
  font-size: 24px;
  color: grey;
  font-weight: 100;

  @media (max-width: 376px) {
    font-size: 20px;
    height: 30px;
    bottom: 4.3em;
  }
`;

const CountdownBar = styled.figure`
  background-color: var(--light);
  width: 99%;
  margin: 0 auto;
  height: 45px;
  position: relative;
  bottom: 3.5em;
  z-index: 1;
  animation: ${countdownBar} 30s linear 3s;
  transform-origin: center left;

  @media (max-width: 376px) {
    height: 41px;
    bottom: 3.2em;
  }
`;

const KeysWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    display: none;
  }
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
  transition: all 0s;
  &:hover {
    background-color: var(--light);
    color: var(--dark);
    img {
      filter: invert(1);
    }
  }
`;
