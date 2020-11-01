/*
 *
 * Trains reducer
 *
 */
import produce from 'immer';
import getRandomColor from 'utils/getRandomColor';
import {
  CREATE_TRAIN,
  MAX_TRAIN_WIDTH,
  MIN_TRAIN_WIDTH,
  START_LOOP,
  STOP_LOOP,
  MIN_TRAIN_SPEED,
  MAX_TRAIN_SPEED,
  MOVE_TRAIN,
  REMOVE_TRAIN,
} from './constants';

const makeNewTrain = id => {
  const width =
    MIN_TRAIN_WIDTH + Math.random() * (MAX_TRAIN_WIDTH - MIN_TRAIN_WIDTH);
  return {
    id,
    width,
    bgColor: getRandomColor(255 * 1.8),
    position: { x: -100, y: Math.random() * 100 },
    speed:
      MIN_TRAIN_SPEED + Math.random() * (MAX_TRAIN_SPEED - MIN_TRAIN_SPEED),
  };
};

export const initialState = { isLooping: false, trains: [] };

/* eslint-disable default-case, no-param-reassign */
const trainsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case START_LOOP:
        draft.isLooping = true;
        break;
      case STOP_LOOP:
        draft.isLooping = false;
        draft.trains = [];
        break;
      case CREATE_TRAIN:
        draft.trains.push(makeNewTrain(action.trainId));
        break;
      case MOVE_TRAIN:
        draft.trains = state.trains.map(train =>
          train.id === action.train.id
            ? { ...train, position: action.position }
            : train,
        );
        break;
      case REMOVE_TRAIN:
        draft.trains = state.trains.filter(
          train => train.id !== action.trainId,
        );
        break;
    }
  });

export default trainsReducer;
