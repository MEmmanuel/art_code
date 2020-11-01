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

const selectLastTrainId = () =>
  createSelector(
    selectTrainsDomain,
    substate =>
      substate.trains
        .map(train => train.id)
        .reduce((m, i) => (m <= i ? i : m), 0),
  );

const selectTrainById = id =>
  createSelector(
    selectTrainsDomain,
    substate => {
      const filteredTrains = substate.trains.filter(train => train.id === id);
      return filteredTrains.length ? filteredTrains[0] : undefined;
    },
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
export {
  selectTrainsDomain,
  selectTrainsIsLooping,
  selectAllTrains,
  selectTrainById,
  selectLastTrainId,
};
