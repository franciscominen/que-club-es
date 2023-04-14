import { fadeIn } from "@/styles/animations";
import useStore from "lib/store/state";
import styled from "styled-components";

export default function ActiveSoundModal() {
  const handleShowModal = () => {
    return useStore.setState((state) => ({
      ...state,
      SHOW_SOUND_MODAL: false,
    }));
  };

  return (
    <ModalWrapper>
      <Modal>
        <button onClick={handleShowModal}>X</button>
        <h4>
          Te recomendamos activar el sonido
          <br /> para una mejor experiencia de juego.
        </h4>
      </Modal>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #000000a4;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
`;

const Modal = styled.div`
  background: var(--light);
  z-index: 11;
  padding: 16px;
  border-radius: 8px;
  color: var(--dark);
  position: absolute;
  top: 2em;
  right: 5.5em;
  animation: ${fadeIn} 0.6s ease-in both;

  button {
    background: var(--red);
    color: var(--light);
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    font-family: var(--alternativeFont);
    width: 24px;
    height: 24px;
    border-radius: 100%;
    position: absolute;
    top: -10px;
    left: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h4 {
    text-align: center;
    font-weight: 100;

    @media (max-width: 426px) {
      font-size: 14px;
    }
  }

  @media (max-width: 769px) {
    right: 4.5em;
  }

  @media (max-width: 426px) {
    right: 4em;
    margin-left: 15px;
  }
`;
