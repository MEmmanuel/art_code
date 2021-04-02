import { css } from 'styled-components';

const birdStyles = css`
  position: absolute;
  display: inline-block;
  height: 0;
  width: 0;
  border-right: 20px solid transparent;
  border-bottom: 44px solid transparent;
  border-left: 20px solid transparent;
  transform-origin: center;
  transition: left 0.5s linear, top 0.5s linear;
`;

export default birdStyles;
