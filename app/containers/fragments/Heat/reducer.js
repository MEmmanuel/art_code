/*
 *
 * Heat reducer
 *
 */
import produce from 'immer';
// import getRandomColor from 'utils/getRandomColor';
import {
  // CREATE_BIRD,
  START_LOOP,
  STOP_LOOP,
  // MOVE_BIRD,
  // REMOVE_BIRD,
  COMPUTE_NEXT_SLICE,
  SLICE_SIZE,
  CELL_SIZE,
  INIT_CELLS,
  UPDATE_CELLS,
  ACTIVATE_CELL,
} from './constants';

const width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
const height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

const rowCellCount = Math.floor(height / CELL_SIZE);
const columnCellCount = Math.floor(width / CELL_SIZE);

const makeNewCell = (id, i, j) => ({
  id,
  position: { i, j },
  temperature: Math.random() * 100,
  isActive: false,
});

const getCellsCount = cells => cells.reduce((c, row) => c + row.length, 0);

export const initialState = {
  isLooping: false,
  sliceStart: 0,
  cells: [],
};

/* eslint-disable default-case, no-param-reassign */
const CellsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case START_LOOP:
        draft.isLooping = true;
        break;
      case STOP_LOOP:
        draft.isLooping = false;
        draft.cells = [];
        break;
      case INIT_CELLS:
        draft.cells = [...Array(rowCellCount)].map((r, i) =>
          [...Array(columnCellCount)].map((c, j) =>
            makeNewCell(i * columnCellCount + j, i, j),
          ),
        );
        break;
      case COMPUTE_NEXT_SLICE:
        draft.sliceStart =
          draft.sliceStart + SLICE_SIZE > getCellsCount(draft.cells)
            ? 0
            : draft.sliceStart + SLICE_SIZE;
        break;
      // case CREATE_BIRD:
      //   draft.birds.push(makeNewBird(action.birdId));
      //   break;
      case UPDATE_CELLS:
        draft.cells = action.cells;
        break;
      case ACTIVATE_CELL:
        draft.cells = state.cells.map(row =>
          row.map(cell => ({ ...cell, isActive: action.cellId === cell.id })),
        );
        break;
    }
  });

export default CellsReducer;
