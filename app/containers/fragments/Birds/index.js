/**
 *
 * Birds
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Bird from 'components/Bird';
import { selectAllBirds } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { startLoop, stopLoop } from './actions';

export class Birds extends React.Component {
  componentDidMount() {
    this.props.dispatch(startLoop());
  }

  componentWillUnmount() {
    this.props.dispatch(stopLoop());
  }

  render() {
    return (
      <React.Fragment>
        {this.props.birds.map(bird => (
          <Bird
            key={bird.id}
            width={bird.width}
            height={20}
            bgColor={bird.bgColor}
            position={bird.position}
            speed={bird.speed}
            angle={bird.angle}
          />
        ))}
      </React.Fragment>
    );
  }
}

Birds.propTypes = {
  dispatch: PropTypes.func.isRequired,
  birds: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  birds: selectAllBirds(),
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

const withReducer = injectReducer({ key: 'birds', reducer });

const withSaga = injectSaga({ key: 'birds', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(Birds);
