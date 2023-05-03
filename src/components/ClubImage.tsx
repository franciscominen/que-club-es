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
        <ClubImg className={isImageLoaded ? "loaded" : ""}>
          <Image
            src={imageSource}
            alt="Please Reload"
            fill
            onLoad={() => setIsImageLoaded(true)}
            priority={true}
          />
        </ClubImg>
      )}
    </>
  );
};

export default ClubImage;

const ClubImg = styled.div`
  height: calc(60vh - 200px);
  // position: relative;
  opacity: 0;
  padding: 0;
  &.loaded {
    animation: ${scaleInCenter} 0.3s ease-in both;
    opacity: 1;
  }

  img {
    position: relative !important;
  }
`;

const Count = styled.div`
  height: calc(60vh - 200px);
  width: calc(60vh - 200px);
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
