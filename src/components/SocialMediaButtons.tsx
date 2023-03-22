import useStore from "lib/store/state";
import Image from "next/image";
import styled from "styled-components";

const SocialMediaButtons = () => {
  const SCOREBOARD = useStore((state) => state.SCOREBOARD);
  const POINTS = useStore((state) => state.POINTS);
  const appUrl = `https://queclube.vercel.app/`;

  const tweetScoreboard = SCOREBOARD.join("");
  const twitterMessage = `https://twitter.com/intent/tweet?text=${tweetScoreboard}%0ALe pegué a ${POINTS} de los 5 escudos de la fecha de hoy. A ver vos que onda? ${appUrl}`;
  const wspMessage = `whatsapp://send?text=${tweetScoreboard}%0ALe pegué a ${POINTS} de los 5 escudos de la fecha de hoy. A ver vos que onda? ${appUrl}`;

  return (
    <div>
      <Title>Compartir</Title>
      <ButtonsWrapper>
        <SocialMediaButton
          continueButton={false}
          href={twitterMessage}
          target="_blank"
        >
          <Image
            src={"/assets/twitter-icon.svg"}
            alt="Twitter"
            width={35}
            height={35}
          />
        </SocialMediaButton>
        <SocialMediaButton
          continueButton={true}
          href={wspMessage}
          target="_blank"
        >
          <Image
            src={"/assets/wsp-icon.svg"}
            alt="WhatsApp"
            width={35}
            height={35}
          />
        </SocialMediaButton>
      </ButtonsWrapper>
    </div>
  );
};

export default SocialMediaButtons;

const Title = styled.h1`
  color: var(--light);
  text-align: center;
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 8px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 13em;
`;

const SocialMediaButton = styled.a<{ continueButton: boolean }>`
  border-radius: 8px;
  background-color: ${(props) =>
    props.continueButton ? `#27AE60` : `#2D9CDB`};
  width: 100%;
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
