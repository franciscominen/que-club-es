import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import useActions from "lib/store/actions";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AbandonGameModal = ({ setShowModal }: Props) => {
  const router = useRouter();
  const { setToPlayed } = useActions();

  const onQuitGame = () => {
    setToPlayed();
    setShowModal(false);
    return router.push("/");
  };

  return (
    <ModalWrapper>
      <ModalBody>
        <Image
          src="/assets/red-card.png"
          alt="Red Card"
          width={70}
          height={70}
        />
        <h3>
          Si volves a inicio perdes
          <br /> la fecha de hoy.
        </h3>
        <div style={{ display: "flex", gap: "16px" }}>
          <StyledButton bg={true} onClick={onQuitGame}>
            Abandonar
          </StyledButton>
          <StyledButton
            bg={false}
            onClick={() => {
              setShowModal(false);
            }}
          >
            Continuar
          </StyledButton>
        </div>
      </ModalBody>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: #00000071;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalBody = styled.div`
  position: relative;
  bottom: 3em;
  border: 2px solid var(--dark);
  max-width: 30em;
  padding: 24px;
  border-radius: 24px;
  background: var(--light);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;

  h3 {
    color: var(--dark);
    text-align: center;
    font-weight: 100;
    line-height: 1.3;
  }
`;
const StyledButton = styled.button<{ bg: boolean }>`
  background: ${(props) => (props.bg ? `var(--red)` : `var(--green)`)};
  color: var(--light);
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 16px;
`;

export default AbandonGameModal;
