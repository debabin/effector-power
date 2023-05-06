import {createRouteView} from 'atomic-router-react';

import {PageLoader} from '~/shared/ui';

import {anonymousRoute, currentRoute} from './model';
import {LoginPage} from './page';

export const LoginRoute = {
  view: createRouteView({route: anonymousRoute, view: LoginPage, otherwise: PageLoader}),
  route: currentRoute,
};
