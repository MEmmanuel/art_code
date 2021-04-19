import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the Birds state domain
 */

const selectBirdsDomain = state => state.birds || initialState;

/**
 * Other specific selectors
 */
const selectBirdsIsLooping = () =>
  createSelector(
    selectBirdsDomain,
    substate => substate.isLooping,
  );

const selectSliceStart = () =>
  createSelector(
    selectBirdsDomain,
    substate => substate.sliceStart,
  );

const selectAllBirds = () =>
  createSelector(
    selectBirdsDomain,
    substate => substate.birds,
  );

const selectLastBirdId = () =>
  createSelector(
    selectBirdsDomain,
    substate =>
      substate.birds.map(bird => bird.id).reduce((m, i) => (m <= i ? i : m), 0),
  );

const selectBirdById = id =>
  createSelector(
    selectBirdsDomain,
    substate => {
      const filteredBirds = substate.birds.filter(bird => bird.id === id);
      return filteredBirds.length ? filteredBirds[0] : undefined;
    },
  );

/**
 * Default selector used by Birds
 */

const makeSelectBirds = () =>
  createSelector(
    selectBirdsDomain,
    substate => substate,
  );

export default makeSelectBirds;
export {
  selectBirdsDomain,
  selectBirdsIsLooping,
  selectSliceStart,
  selectAllBirds,
  selectBirdById,
  selectLastBirdId,
};
