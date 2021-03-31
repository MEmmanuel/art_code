/**
 *
 * Link
 *
 */
import { Link as RouterLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Link = styled(RouterLink)`
  color: inherit;
  text-decoration: none;
  font-size: ${props => props.fontSize || 10}px;
`;

Link.propTypes = { fontSize: PropTypes.number };

export default Link;
