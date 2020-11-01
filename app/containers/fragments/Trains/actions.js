/*
 *
 * Trains actions
 *
 */

import {
  START_LOOP,
  STOP_LOOP,
  LOOP,
  CREATE_TRAIN,
  MOVE_TRAIN,
  REMOVE_TRAIN,
} from './constants';

/**
 * Start the loop
 * @return {object} An action object with a type of START_LOOP
 */
export function startLoop() {
  return {
    type: START_LOOP,
  };
}

/**
 * Make a loop
 * @return {object} An action object with a type of LOOP
 */
export function loop() {
  return {
    type: LOOP,
  };
}

/**
 * Stop the loop
 * @return {object} An action object with a type of STOP_LOOP
 */
export function stopLoop() {
  return {
    type: STOP_LOOP,
  };
}

/**
 * Create a train
 * @return {object} An action object with a type of CREATE_TRAIN
 */
export function createTrain(trainId) {
  return {
    type: CREATE_TRAIN,
    trainId,
  };
}

/**
 * Move a train
 * @return {object} An action object with a type of MOVE_TRAIN
 */
export function moveTrain(train, position) {
  return {
    type: MOVE_TRAIN,
    train,
    position,
  };
}

/**
 * Remove a train
 * @return {object} An action object with a type of REMOVE_TRAIN
 */
export function removeTrain(trainId) {
  return {
    type: REMOVE_TRAIN,
    trainId,
  };
}
