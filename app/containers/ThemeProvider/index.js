/**
 *
 * ThemeProvider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  mixins: {
    toolbar: {
      color: '#808080',
      backgroundColor: '#333',
      textTransform: 'uppercase',
    },
  },
});

export function ThemeProvider(props) {
  return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>;
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(ThemeProvider);
