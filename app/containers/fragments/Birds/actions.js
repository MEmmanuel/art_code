/*
 *
 * Birds actions
 *
 */

import {
  START_LOOP,
  STOP_LOOP,
  LOOP,
  CREATE_BIRD,
  MOVE_BIRD,
  REMOVE_BIRD,
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
 * Create a Bird
 * @return {object} An action object with a type of CREATE_BIRD
 */
export function createBird(birdId) {
  return {
    type: CREATE_BIRD,
    birdId,
  };
}

/**
 * Move a Bird
 * @return {object} An action object with a type of MOVE_BIRD
 */
export function moveBird(bird, position, angle) {
  return {
    type: MOVE_BIRD,
    bird,
    position,
    angle,
  };
}

/**
 * Remove a Bird
 * @return {object} An action object with a type of REMOVE_BIRD
 */
export function removeBird(birdId) {
  return {
    type: REMOVE_BIRD,
    birdId,
  };
}
