/**
 *
 * Asynchronously loads the component for Cell
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
