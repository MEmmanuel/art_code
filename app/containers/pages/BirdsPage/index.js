/**
 *
 * BirdsPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import Birds from 'containers/fragments/Birds';
import Fragmentcontainer from 'components/Fragmentcontainer';

export function BirdsPage() {
  return (
    <div>
      <Helmet>
        <title>BirdsPage</title>
        <meta name="description" content="Description of BirdsPage" />
      </Helmet>
      <Fragmentcontainer>
        <Birds />
      </Fragmentcontainer>
    </div>
  );
}

BirdsPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
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

export default compose(withConnect)(BirdsPage);
