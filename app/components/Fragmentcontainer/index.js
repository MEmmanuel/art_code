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
  background-color: black;
  height: calc(100vh - 48px);
`;

function Fragmentcontainer(props) {
  return <Container>{props.children}</Container>;
}
Fragmentcontainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Fragmentcontainer;
