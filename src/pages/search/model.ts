import {routes} from '~/shared/routing';

export const currentRoute = routes.search;

currentRoute.opened.watch(() => console.info('Search route opened'));
