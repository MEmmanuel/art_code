/*
 *
 * Trains actions
 *
 */

import { START_LOOP, STOP_LOOP, LOOP, CREATE_TRAIN } from './constants';

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
export function createTrain() {
  return {
    type: CREATE_TRAIN,
  };
}
