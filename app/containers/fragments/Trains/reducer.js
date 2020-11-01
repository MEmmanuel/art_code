/*
 *
 * Trains reducer
 *
 */
import produce from 'immer';
import {
  CREATE_TRAIN,
  MAX_TRAIN_WIDTH,
  MIN_TRAIN_WIDTH,
  START_LOOP,
  STOP_LOOP,
} from './constants';
import getRandomColor from '../../../utils/getRandomColor';

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
        draft.trains.push({
          id: draft.trains.length + 1,
          width:
            MIN_TRAIN_WIDTH +
            Math.random() * (MAX_TRAIN_WIDTH - MIN_TRAIN_WIDTH),
          bgColor: getRandomColor(255 * 1.8),
          position: { x: Math.random() * 100, y: Math.random() * 100 },
        });
        break;
    }
  });

export default trainsReducer;
