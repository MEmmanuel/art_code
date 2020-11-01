/**
 *
 * Trains
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Train from 'components/Train';
import { selectAllTrains } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { startLoop, stopLoop } from './actions';

export class Trains extends React.Component {
  componentDidMount() {
    this.props.dispatch(startLoop());
  }

  componentWillUnmount() {
    this.props.dispatch(stopLoop());
  }

  render() {
    return (
      <React.Fragment>
        {this.props.trains.map(train => (
          <Train
            key={train.id}
            width={train.width}
            name={train}
            height={20}
            bgColor={train.bgColor}
            position={train.position}
            speed={train.speed}
          />
        ))}
      </React.Fragment>
    );
  }
}

Trains.propTypes = {
  dispatch: PropTypes.func.isRequired,
  trains: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  trains: selectAllTrains(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'trains', reducer });

const withSaga = injectSaga({ key: 'trains', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(Trains);
