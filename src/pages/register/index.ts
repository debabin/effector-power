import {createRouteView} from 'atomic-router-react';

import {PageLoader} from '~/shared/ui';

import {anonymousRoute, currentRoute} from './model';
import {RegisterPage} from './page';

export const RegisterRoute = {
  view: createRouteView({route: anonymousRoute, view: RegisterPage, otherwise: PageLoader}),
  route: currentRoute,
};
