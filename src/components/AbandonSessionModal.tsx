import styled from "styled-components";

const AbandonSessionModal = ({ onCancel, onConfirm }) => {
  return (
    <ModalWrapper>
      <ModalBody>
        <h3>
          Si confirmas esta acción el juego se dará por finalizado hasta la
          próxima fecha. <br />
          ¿Deseas proceder?
        </h3>
        <button onClick={onCancel}>Cancelar</button>
        <button onClick={onConfirm}>Confirmar</button>
      </ModalBody>
    </ModalWrapper>
  );
};

export default AbandonSessionModal;

const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: #00000094;
  position: fixed;
  top: 0;
  right: 0;
`;

const ModalBody = styled.div`
  background-color: var(--light);
  margin: 0 auto;
  padding: 16px;
  border-radius: 24px;
  width: 90%;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 30%;
`;
