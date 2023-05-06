import {chainRoute} from 'atomic-router';

import {routes} from '~/shared/routing';
import {chainAuthorized} from '~/shared/session';

export const currentRoute = routes.search;
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.auth.login.open,
});

authorizedRoute.opened.watch(() => console.info('Search authorize route opened'));
