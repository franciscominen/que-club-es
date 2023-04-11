import { keyframes } from "styled-components";

const countdownBar = keyframes`
  to {
    transform: scaleX(0);
  }
`;

const loader = keyframes`
 0% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
`;

const homeTitle = keyframes`
   0% {
    -webkit-transform: translateY(-500px);
            transform: translateY(-500px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    -webkit-transform: translateY(-65px);
            transform: translateY(-65px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  72% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  81% {
    -webkit-transform: translateY(-28px);
            transform: translateY(-28px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  90% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  95% {
    -webkit-transform: translateY(-8px);
            transform: translateY(-8px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const slideInBottom = keyframes`
  0% {
    -webkit-transform: translateY(100%);
        transform: translateY(100%);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
`;

const imageLoader = keyframes`
  0% {
    -webkit-transform: scale(0.2);
            transform: scale(0.2);
    opacity: 0.8;
  }
  80% {
    -webkit-transform: scale(1.2);
            transform: scale(1.2);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(2.2);
            transform: scale(2.2);
    opacity: 0;
  }
`;

const scaleInCenter = keyframes`
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
`;

const slideInTop = keyframes`
  0% {
    -webkit-transform: translateY(-100%);
            transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
`;

const slideInLeft = keyframes`
  0% {
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
`;

const cascadeAnimation = keyframes`
  0% {
    letter-spacing: 1em;
    transform: translateZ(300px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    transform: translateZ(12px);
    filter: blur(0);
    opacity: 1;
  }
`;

export {
  countdownBar,
  loader,
  homeTitle,
  fadeIn,
  slideInBottom,
  imageLoader,
  scaleInCenter,
  slideInTop,
  slideInLeft,
  cascadeAnimation,
};
