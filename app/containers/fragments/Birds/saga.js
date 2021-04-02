/**
 * Make the Birds appear and move
 */

import {
  put,
  select,
  takeLatest,
  delay,
  takeEvery,
  all,
} from 'redux-saga/effects';
import calculateDistance from 'utils/calculateDistance';
import {
  START_LOOP,
  LOOP,
  LOOP_DELAY,
  CREATE_BIRD,
  MOVE_BIRD,
  BIRD_START_COUNT,
  BIRD_SPEED,
  BIRD_RANDOM_MAX_ANGLE,
  ALIGNMENT_WEIGHT,
  BIRD_WEIGHT,
  NEAREST_INFLUENCABLE_COUNT,
} from './constants';
import { loop, createBird, moveBird } from './actions';
import {
  selectLastBirdId,
  selectBirdsIsLooping,
  selectAllBirds,
} from './selectors';

/**
 * Start the loop
 */
export function* startLoopSaga() {
  const newId = (yield select(selectLastBirdId())) + 1;
  for (let i = 0; i < BIRD_START_COUNT; i += 1) {
    yield put(createBird(newId + i));
  }
  yield put(loop());
}

/**
 * Make the loop
 */
export function* loopSaga() {
  const isLooping = yield select(selectBirdsIsLooping());
  if (isLooping) {
    const birds = yield select(selectAllBirds());

    // align to others
    const findNearest = (birdsList, referenceBird, countToFound) =>
      birdsList
        .sort(
          (b1, b2) =>
            calculateDistance(
              b1.position.x,
              b1.position.y,
              referenceBird.position.x,
              referenceBird.position.y,
            ) <
            calculateDistance(
              b2.position.x,
              b2.position.y,
              referenceBird.position.x,
              referenceBird.position.y,
            ),
        )
        .slice(1, countToFound + 1);

    const getMeanAngle = birdsList =>
      birdsList.reduce(
        ({ mean, count }, bird) => ({
          mean: (mean * count + bird.angle) / (count + 1) || bird.angle,
          count: count + 1,
        }),
        { mean: 0, count: 0 },
      ).mean;

    let movedBirds = birds.map(b => {
      const nearestBirds = findNearest(
        [...birds],
        birds[0],
        NEAREST_INFLUENCABLE_COUNT,
      );

      const newAngle =
        (b.angle +
          (Math.random() * 2 - 1) * BIRD_RANDOM_MAX_ANGLE +
          (getMeanAngle(nearestBirds) * ALIGNMENT_WEIGHT) / 100) /
        (1 + ALIGNMENT_WEIGHT / 100);

      return {
        bird: b,
        newPosition: {
          x:
            b.position.x +
            BIRD_SPEED * Math.sin((newAngle * 2 * Math.PI) / 360),
          y:
            b.position.y -
            BIRD_SPEED * Math.cos((newAngle * 2 * Math.PI) / 360),
        },
        newAngle,
      };
    });

    // repulsed by walls

    const calculateRepulsion = (angle, offset, invert) => {
      let intermediateValue = 180 - ((angle + offset + 90) % 360);

      if (invert) {
        intermediateValue *= -1;
      }
      return (
        angle + (intermediateValue / Math.abs(intermediateValue)) * BIRD_WEIGHT
      );
    };

    movedBirds = movedBirds.map(mb => {
      let { newAngle } = mb;
      const { newPosition } = mb;

      if (newPosition.x <= 10) {
        newAngle = calculateRepulsion(newAngle, 0, false);
      }
      if (newPosition.x >= 90) {
        newAngle = calculateRepulsion(newAngle, 0, true);
      }
      if (newPosition.y <= 10) {
        newAngle = calculateRepulsion(newAngle, -90, false);
      }
      if (newPosition.y >= 90) {
        newAngle = calculateRepulsion(newAngle, -90, true);
      }

      return {
        ...mb,
        newAngle,
        newPosition,
      };
    });

    // bump at walls

    const bumpToVerticalWall = angle =>
      Math.round((((angle + 90) / 2) % 180) / 180) * 360 - angle;

    const bumpToHorizontalWall = angle =>
      Math.round(((angle / 2) % 180) / 180) * 360 + 180 - angle;

    movedBirds = movedBirds.map(mb => {
      let { newAngle } = mb;
      const { newPosition } = mb;

      if (newPosition.x >= 100 || newPosition.x <= 0) {
        newAngle = bumpToVerticalWall(newAngle);
      }
      if (newPosition.y >= 100 || newPosition.y <= 0) {
        newAngle = bumpToHorizontalWall(newAngle);
      }
      if (newPosition.x < 0) {
        newPosition.x = -newPosition.x;
      }
      if (newPosition.x > 100) {
        newPosition.x = 200 - newPosition.x;
      }
      if (newPosition.y < 0) {
        newPosition.y = -newPosition.y;
      }
      if (newPosition.y > 100) {
        newPosition.y = 200 - newPosition.y;
      }

      return {
        ...mb,
        newAngle: newAngle % 360,
        newPosition,
      };
    });

    yield all(
      movedBirds.map(({ bird, newPosition, newAngle }) =>
        put(moveBird(bird, newPosition, newAngle)),
      ),
    );

    // changer le déplacement pour aller dans la direction de mon angle
    // ajouter une vitesse à l'oiseau
    // il avance de X par loop dans la direction de l'angle
    // ajouter une composante je cherche à avoir le même angle que mes copains
    // ajouter une composante "je me rapproche des copains trop loins"
    // ajouter une composante " je m'éloigne de tout ce qui est trop près"
    yield delay(LOOP_DELAY);
    yield put(loop());
  }
}

/**
 * After Bird has been created
 */
export function* createBirdSaga(payload) {
  // eslint-disable-next-line no-console
  console.log(payload);
  // yield delay(10);
  // const Bird = yield select(selectBirdById(payload.BirdId));
  // if (Bird) {
  //   yield put(moveBird(Bird, Bird.position));
  // }
}

/**
 * After Bird has been moved
 */
export function* moveBirdSaga(payload) {
  // eslint-disable-next-line no-console
  console.log(payload);
  // yield delay(10000);
  // yield put(removeBird(payload.Bird.id));
}

// Individual exports for testing
export default function* BirdsSaga() {
  yield takeLatest(START_LOOP, startLoopSaga);
  yield takeLatest(LOOP, loopSaga);
  yield takeEvery(CREATE_BIRD, createBirdSaga);
  yield takeEvery(MOVE_BIRD, moveBirdSaga);
}
