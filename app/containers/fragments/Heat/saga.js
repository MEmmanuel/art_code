/**
 * Make the Heat appear and move
 */

import { put, select, takeLatest, delay } from 'redux-saga/effects';
import {
  START_LOOP,
  LOOP,
  LOOP_DELAY,
  SLICE_SIZE,
  COMPUTE_NEXT_SLICE,
  LAMBDA,
  WALL_TEMPERATURE,
  MOUSE_HEAT_FLUX,
} from './constants';
import { loop, computeNextSlice, updateCells, initCells } from './actions';
import {
  selectHeatIsLooping,
  selectAllCellsFlat,
  selectSliceStart,
  selectAllCells,
} from './selectors';

/**
 * Start the loop
 */
export function* startLoopSaga() {
  yield put(initCells());
  yield put(loop());
}

/**
 * Make the loop
 */
export function* loopSaga() {
  const isLooping = yield select(selectHeatIsLooping());
  if (isLooping) {
    yield put(computeNextSlice());
    yield delay(LOOP_DELAY);
    yield put(loop());
  }
}

/**
 * Compute everything for a slice of the cells
 */
export function* computeNextSliceSaga() {
  const flatCells = yield select(selectAllCellsFlat());
  const cells = yield select(selectAllCells());
  const sliceStart = yield select(selectSliceStart());

  const updatedCells = flatCells.slice(sliceStart, sliceStart + SLICE_SIZE).map(
    cell => ({
      ...cell,
      temperature:
        cell.temperature +
        ((cell.position.i > 0
          ? cells[cell.position.i - 1][cell.position.j].temperature
          : WALL_TEMPERATURE) -
          cell.temperature +
          (cell.position.i < cells.length - 1
            ? cells[cell.position.i + 1][cell.position.j].temperature
            : WALL_TEMPERATURE) -
          cell.temperature +
          (cell.position.j > 0
            ? cells[cell.position.i][cell.position.j - 1].temperature
            : WALL_TEMPERATURE) -
          cell.temperature +
          (cell.position.j < cells[0].length - 1
            ? cells[cell.position.i][cell.position.j + 1].temperature
            : WALL_TEMPERATURE) -
          cell.temperature) *
          LAMBDA +
        (cell.isActive ? MOUSE_HEAT_FLUX : 0),
    }),
    // const nearestHeat = findNearest(
    //   [...cells],
    //   cells[0],
    //   NEAREST_INFLUENCABLE_COUNT,
    // );
    //
    // const newAngle =
    //   (b.angle +
    //     (Math.random() * 2 - 1) * BIRD_RANDOM_MAX_ANGLE +
    //     (getMeanAngle(nearestHeat) * ALIGNMENT_WEIGHT) / 100) /
    //   (1 + ALIGNMENT_WEIGHT / 100);
    //
    // return {
    //   bird: b,
    //   newPosition: {
    //     x: b.position.x + BIRD_SPEED * Math.sin((newAngle * 2 * Math.PI) / 360),
    //     y: b.position.y - BIRD_SPEED * Math.cos((newAngle * 2 * Math.PI) / 360),
    //   },
    //   newAngle,
    // };
  );

  // yield all(
  //   updatedCell.map(({ cell, newTemperature }) =>
  //     put(updateCell(cell, newTemperature)),
  //   ),
  // );
  if (updatedCells.length) {
    yield put(
      updateCells(
        cells.map(row =>
          row.map(cell => {
            const upCell = updatedCells.reduce(
              (uCell, updatedCell) =>
                uCell || (updatedCell.id === cell.id && updatedCell),
              undefined,
            );
            return upCell || cell;
          }),
        ),
      ),
    );
  }
}

// Individual exports for testing
export default function* HeatSaga() {
  yield takeLatest(START_LOOP, startLoopSaga);
  yield takeLatest(LOOP, loopSaga);
  yield takeLatest(COMPUTE_NEXT_SLICE, computeNextSliceSaga);
}
