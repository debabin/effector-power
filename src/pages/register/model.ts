import {routes} from '~/shared/routing';
import {chainAnonymous} from '~/shared/session';

export const currentRoute = routes.auth.register;
export const anonymousRoute = chainAnonymous(currentRoute, {
  otherwise: routes.search.open,
});
