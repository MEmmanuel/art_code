/**
 *
 * Train
 *
 */

import PropTypes from 'prop-types';
import styled from 'styled-components';

import trainStyles from './trainStyles';

const Train = styled.div.attrs(props => ({
  style: {
    height: `${Math.round(props.height)}px`,
    width: `${Math.round(props.width)}px`,
    left: `${Math.round(props.position.x)}%`,
    top: `${Math.round(props.position.y)}%`,
    borderRadius: `${Math.round(props.height / 2)}px`,
    transition: `left ${10 - Math.round(props.speed)}s linear`,
    backgroundColor: `rgb(${props.bgColor[0]}, ${props.bgColor[1]}, ${
      props.bgColor[2]
    })`,
  },
}))`
  ${trainStyles}
`;

Train.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  bgColor: PropTypes.arrayOf(PropTypes.number),
  speed: PropTypes.number.isRequired,
};

export default Train;
