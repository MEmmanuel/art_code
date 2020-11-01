import { startLoop } from '../actions';
import { START_LOOP } from '../constants';

describe('Trains actions', () => {
  describe('Start Loop Action', () => {
    it('has a type of START_LOOP', () => {
      const expected = {
        type: START_LOOP,
      };
      expect(startLoop()).toEqual(expected);
    });
  });
});
