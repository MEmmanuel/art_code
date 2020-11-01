import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the trains state domain
 */

const selectTrainsDomain = state => state.trains || initialState;

/**
 * Other specific selectors
 */
const selectTrainsIsLooping = () =>
  createSelector(
    selectTrainsDomain,
    substate => substate.isLooping,
  );

const selectAllTrains = () =>
  createSelector(
    selectTrainsDomain,
    substate => substate.trains,
  );

/**
 * Default selector used by Trains
 */

const makeSelectTrains = () =>
  createSelector(
    selectTrainsDomain,
    substate => substate,
  );

export default makeSelectTrains;
export { selectTrainsDomain, selectTrainsIsLooping, selectAllTrains };
