/**
 *
 * Train
 *
 */

import PropTypes from 'prop-types';
import styled from 'styled-components';

import trainStyles from './trainStyles';

const Train = styled.div`
  ${trainStyles};
  height: ${props => Math.round(props.height)}px;
  width: ${props => Math.round(props.width)}px;
  left: ${props => Math.round(props.position.x)}%;
  top: ${props => Math.round(props.position.y)}%;
  background-color: rgb(
    ${props => props.bgColor[0]},
    ${props => props.bgColor[1]},
    ${props => props.bgColor[2]}
  );
  border-radius: ${props => Math.round(props.height / 2)}px;
  transition: left ${props => 10 - Math.round(props.speed)}s linear;
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
