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
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  left: ${props => props.position.x}%;
  top: ${props => props.position.y}%;
  background-color: rgb(
    ${props => props.bgColor[0]},
    ${props => props.bgColor[1]},
    ${props => props.bgColor[2]}
  );
  border-radius: ${props => props.height / 2}px;
`;

Train.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  bgColor: PropTypes.arrayOf(PropTypes.number),
};

export default Train;
