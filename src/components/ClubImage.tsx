import { scaleInCenter } from "@/styles/animations";
import useStore from "lib/store/state";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ClubImage = () => {
  const RANDOM_TEAMS = useStore((state) => state.RANDOM_TEAMS);
  const STEPS = useStore((state) => state.STEPS);
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
  }, [STEPS]);

  return (
    <>
      {showCount ? (
        <Count>
          <h1 key={count}>{count}</h1>
        </Count>
      ) : (
        <ClubImg
          src={RANDOM_TEAMS[STEPS]?.img}
          alt="Please Reload"
          width={220}
          height={220}
          onLoad={() => setIsImageLoaded(true)}
          className={isImageLoaded ? "loaded" : ""}
          priority={true}
        />
      )}
    </>
  );
};

export default ClubImage;

const ClubImg = styled(Image)`
  opacity: 0;
  margin: 8px 0;
  &.loaded {
    animation: ${scaleInCenter} 0.3s ease-in both;
    opacity: 1;
  }
`;

const Count = styled.div`
  width: 236px;
  height: 236px;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    animation: ${scaleInCenter} 0.33s ease-in both;
    font-size: 140px;
    font-weight: 100;
    color: var(--light);
  }
`;
