import { scaleInCenter } from "@/styles/animations";
import useStore from "lib/store/state";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ClubImage = ({ imageSource, steps }: any) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showCount, setShowCount] = useState(false);
  const [count, setCount] = useState(3);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 1) {
          clearInterval(intervalId);
        }
        return prevCount - 1;
      });
    }, 1000);

    setShowCount(true);
    setTimeout(() => {
      setShowCount(false);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [steps]);

  return (
    <>
      {showCount ? (
        <Count>
          <h1 key={count}>{count}</h1>
        </Count>
      ) : (
        <ClubImg
          src={imageSource}
          alt="Please Reload"
          className={!showCount ? "loaded" : ""}
        />
      )}
    </>
  );
};

export default ClubImage;

const ClubImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  padding: 0;
  &.loaded {
    animation: ${scaleInCenter} 0.3s ease-in both;
    opacity: 1;
  }
`;

const Count = styled.div`
  width: 100%;
  height: 100%
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  h1 {
    animation: ${scaleInCenter} 0.33s ease-in both;
    font-size: 140px;
    font-weight: 100;
    color: var(--light);
    text-align: center;
  }
`;
