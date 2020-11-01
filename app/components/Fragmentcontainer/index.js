/**
 *
 * Fragmentcontainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  overflow: hidden;
  position: relative;
  height: calc(100vh - 64px);
`;

function Fragmentcontainer(props) {
  return <Container>{props.children}</Container>;
}
Fragmentcontainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Fragmentcontainer;
