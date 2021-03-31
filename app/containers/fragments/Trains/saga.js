/**
 * Make the trains appear and move
 */

import { put, select, takeLatest, delay, takeEvery } from 'redux-saga/effects';
import {
  START_LOOP,
  LOOP,
  LOOP_DELAY,
  CREATE_TRAIN,
  MOVE_TRAIN,
  TRAIN_CREATION_RATE,
} from './constants';
import { loop, createTrain, moveTrain, removeTrain } from './actions';
import {
  selectLastTrainId,
  selectTrainsIsLooping,
  selectTrainById,
} from './selectors';

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
  const newId = (yield select(selectLastTrainId())) + 1;
  if (isLooping) {
    for (let i = 0; i < TRAIN_CREATION_RATE; i += 1) {
      yield put(createTrain(newId + i));
    }
    yield delay(LOOP_DELAY);
    yield put(loop());
  }
}

/**
 * After train has been created
 */
export function* createTrainSaga(payload) {
  yield delay(10);
  const train = yield select(selectTrainById(payload.trainId));
  if (train) {
    yield put(moveTrain(train, { ...train.position, x: 100 }));
  }
}

/**
 * After train has been moved
 */
export function* moveTrainSaga(payload) {
  yield delay(10000);
  yield put(removeTrain(payload.train.id));
}

// Individual exports for testing
export default function* trainsSaga() {
  yield takeLatest(START_LOOP, startLoopSaga);
  yield takeLatest(LOOP, loopSaga);
  yield takeEvery(CREATE_TRAIN, createTrainSaga);
  yield takeEvery(MOVE_TRAIN, moveTrainSaga);
}
