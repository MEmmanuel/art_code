/**
 *
 * Link
 *
 */
import { Link as RouterLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Link = styled(RouterLink).attrs(({ fontSize }) => ({
  fontSize,
}))`
  color: inherit;
  text-decoration: none;
  font-size: ${props => props.fontSize}px;
`;

Link.propTypes = { fontSize: PropTypes.number };

export default Link;
