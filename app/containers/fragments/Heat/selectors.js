import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the Heat state domain
 */

const selectHeatDomain = state => state.heat || initialState;

/**
 * Other specific selectors
 */
const selectHeatIsLooping = () =>
  createSelector(
    selectHeatDomain,
    substate => substate.isLooping,
  );

const selectSliceStart = () =>
  createSelector(
    selectHeatDomain,
    substate => substate.sliceStart,
  );

const selectAllCells = () =>
  createSelector(
    selectHeatDomain,
    substate => substate.cells,
  );

const selectAllCellsFlat = () =>
  createSelector(
    selectHeatDomain,
    substate => substate.cells.reduce((acc, row) => acc.concat(row), []),
  );

// const selectLastBirdId = () =>
//   createSelector(
//     selectHeatDomain,
//     substate =>
//       substate.birds.map(bird => bird.id).reduce((m, i) => (m <= i ? i : m), 0),
//   );

const selectCellByPosition = (x, y) =>
  createSelector(
    selectHeatDomain,
    substate => {
      const filteredCell = substate.cells.filter(
        cell => cell.x === x && cell.y === y,
      );
      return filteredCell.length ? filteredCell[0] : undefined;
    },
  );

/**
 * Default selector used by Heat
 */

const makeSelectHeat = () =>
  createSelector(
    selectHeatDomain,
    substate => substate,
  );

export default makeSelectHeat;
export {
  selectHeatDomain,
  selectHeatIsLooping,
  selectSliceStart,
  selectAllCellsFlat,
  selectAllCells,
  selectCellByPosition,
};
