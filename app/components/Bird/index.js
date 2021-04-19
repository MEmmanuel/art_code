/**
 *
 * Bird
 *
 */

import PropTypes from 'prop-types';
import styled from 'styled-components';

import birdStyles from './birdStyles';

const Bird = styled.div.attrs(props => ({
  style: {
    left: `${Math.round(props.position.x)}%`,
    top: `${Math.round(props.position.y)}%`,
    borderBottomColor: `rgb(${props.bgColor[0]}, ${props.bgColor[1]}, ${
      props.bgColor[2]
    })`,
    transform: `rotate(${props.angle || 0}deg`,
    transition: `left ${props.transitionTime ||
      1}s linear, top ${props.transitionTime ||
      1}s linear, transform ${props.transitionTime || 1}s linear`,
  },
}))`
  ${birdStyles}
`;

Bird.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  bgColor: PropTypes.arrayOf(PropTypes.number),
  angle: PropTypes.number,
  transitionTime: PropTypes.number,
};

export default Bird;
