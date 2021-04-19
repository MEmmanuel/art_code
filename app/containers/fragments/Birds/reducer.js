/*
 *
 * Birds reducer
 *
 */
import produce from 'immer';
import getRandomColor from 'utils/getRandomColor';
import {
  CREATE_BIRD,
  START_LOOP,
  STOP_LOOP,
  MOVE_BIRD,
  REMOVE_BIRD,
  COMPUTE_NEXT_SLICE,
  SLICE_SIZE,
} from './constants';

const makeNewBird = id => ({
  id,
  bgColor: getRandomColor(255 * 1.8),
  position: { x: Math.random() * 100, y: Math.random() * 100 },
  angle: Math.random() * 360,
});

export const initialState = { isLooping: false, sliceStart: 0, birds: [] };

/* eslint-disable default-case, no-param-reassign */
const BirdsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case START_LOOP:
        draft.isLooping = true;
        break;
      case STOP_LOOP:
        draft.isLooping = false;
        draft.birds = [];
        break;
      case COMPUTE_NEXT_SLICE:
        draft.sliceStart =
          draft.sliceStart + SLICE_SIZE > draft.birds.length
            ? 0
            : draft.sliceStart + SLICE_SIZE;
        break;
      case CREATE_BIRD:
        draft.birds.push(makeNewBird(action.birdId));
        break;
      case MOVE_BIRD:
        draft.birds = state.birds.map(bird =>
          bird.id === action.bird.id
            ? { ...bird, position: action.position, angle: action.angle }
            : bird,
        );
        break;
      case REMOVE_BIRD:
        draft.birds = state.birds.filter(bird => bird.id !== action.birdId);
        break;
    }
  });

export default BirdsReducer;
