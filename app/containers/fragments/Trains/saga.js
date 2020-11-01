/**
 * Make the trains appear and move
 */

import { put, select, takeLatest, delay } from 'redux-saga/effects';
import {
  START_LOOP,
  LOOP,
  LOOP_DELAY,
  TRAIN_CREATION_RATE,
  CREATE_TRAIN,
} from './constants';
import { loop, createTrain } from './actions';
import { selectTrainsIsLooping } from './selectors';

// import request from 'utils/request';
// import { makeSelectUsername } from 'containers/HomePage/selectors';

/**
 * Start the loop
 */
export function* startLoopSaga() {
  yield put(loop());
}

/**
 * Make the loop
 */
export function* loopSaga() {
  const isLooping = yield select(selectTrainsIsLooping());
  if (isLooping) {
    for (let i = 0; i < TRAIN_CREATION_RATE; i += 1) {
      yield put(createTrain());
    }
    yield delay(LOOP_DELAY);
    yield put(loop());
  }
}

/**
 * Create some trains
 */
export function* createTrainSaga() {
  yield undefined;
}

// Individual exports for testing
export default function* trainsSaga() {
  // Watches for LOAD_REPOS actions and calls createTrains when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(START_LOOP, startLoopSaga);
  yield takeLatest(LOOP, loopSaga);
  yield takeLatest(CREATE_TRAIN, createTrainSaga);
}

// créer une saga "loop", qui attend 100ms, et se rappelle elle même.
// créer une saga qui créé n trains, appelée par loop.
// créer une saga qui supprime les trains arrivés au bout, appelée par loop.
