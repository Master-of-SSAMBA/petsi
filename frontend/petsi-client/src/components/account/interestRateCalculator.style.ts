import styled, { keyframes } from "styled-components";

const flipHorizontalBottom = keyframes`
  0% {
    transform: rotateX(0);
  }
  100% {
    transform: rotateX(-360deg);
  }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding: 3rem 2rem;
    margin: 3rem 0;

    h1,
    h2,
    h3,
    h4 {
        margin: 0;
    }
`;

const AnimatedNumber = styled.div`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    perspective: 1000px;
    gap: 1rem;
    margin-bottom: 1rem;

    p {
        font-size: var(--font-body-h3);
    }
`;

const AnimatedContent = styled.div`
    text-align: center;
    animation: ${flipHorizontalBottom} 0.6s
        cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
    -webkit-animation: ${flipHorizontalBottom} 0.4s
        cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
`;

const SliderContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1.5rem 0;
    gap: 1rem;
`;

const Slider = styled.input`
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 0.5rem;
    background: #ddd;
    border-radius: 5px;
    outline: none;
    transition: background 0.3s ease;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 1rem;
        height: 1rem;
        background: var(--color-black);
        border-radius: 50%;
        cursor: pointer;
        transition: background 0.3s ease;
    }

    &::-moz-range-thumb {
        width: 1rem;
        height: 1rem;
        background: var(--color-black);
        border-radius: 50%;
        cursor: pointer;
        transition: background 0.3s ease;
    }
`;

const LabelContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 3rem;
`;

const Label = styled.h6`
    flex-basis: 0;
    flex-grow: 1;
    text-align: center;
    margin: 0;
`;

const ResultContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 2rem;
`;

const ResultItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    width: 10rem;

    h4,
    h5 {
        text-align: center;
    }
`;

export {
    Container,
    AnimatedNumber,
    AnimatedContent,
    SliderContainer,
    Slider,
    LabelContainer,
    Label,
    ResultContainer,
    ResultItem,
};
