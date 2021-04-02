/**
 * Asynchronously loads the component for BirdsPage
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
