/**
 *
 * TrainsPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import Trains from 'containers/fragments/Trains';
import Fragmentcontainer from 'components/Fragmentcontainer';

export function TrainsPage() {
  return (
    <div>
      <Helmet>
        <title>TrainsPage</title>
        <meta name="description" content="Description of TrainsPage" />
      </Helmet>
      <Fragmentcontainer>
        <Trains />
      </Fragmentcontainer>
    </div>
  );
}

TrainsPage.propTypes = {
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

export default compose(withConnect)(TrainsPage);
