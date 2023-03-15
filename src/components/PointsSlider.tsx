import useStore from "lib/store/state";
import { useState } from "react";
import styled from "styled-components";

const PointsSlider = ({ points }: any) => {
  const PLAYED_TEAMS = useStore((state) => state.PLAYED_TEAMS);

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    return setToggle(!toggle);
  };

  return (
    <>
      {toggle ? (
        <PointsWrapper>
          <TeamsList>
            <Title>Clubes:</Title>
            {PLAYED_TEAMS.map((team) => {
              return (
                <li key={team.id}>
                  <img src={team.img} alt="" style={{ width: "30px" }} />
                  <h3>{team.name}</h3>
                </li>
              );
            })}
          </TeamsList>
          <ShowAnswersBtn onClick={handleToggle}>Ver puntuación</ShowAnswersBtn>
        </PointsWrapper>
      ) : (
        <PointsWrapper>
          <div>
            <Title>Resultado:</Title>
            <Points>
              {points}
              <span>Pts</span>
            </Points>
          </div>
          <ShowAnswersBtn onClick={handleToggle}>Ver respuestas</ShowAnswersBtn>
        </PointsWrapper>
      )}
    </>
  );
};

export default PointsSlider;

const PointsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 43vh;
`;

const Title = styled.h1`
  color: var(--light);
  font-size: 28px;
  font-weight: 300;
  text-align: center;
`;

const Points = styled.div`
  color: var(--light);
  font-size: 120px;
  line-height: 1;

  span {
    font-size: 26px;
  }
`;

const ShowAnswersBtn = styled.button`
  background-color: var(--light);
  padding: 8px 24px;
  border-radius: 50px;
  font-size: 18px;
  mix-blend-mode: screen;
`;

const TeamsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  li {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--light);

    h3 {
      font-weight: 300;
      font-size: 20px;
    }
  }
`;
