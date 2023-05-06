import {routes} from '~/shared/routing';
import {chainAuthorized} from '~/shared/session';

export const currentRoute = routes.search;
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.auth.login.open,
});
