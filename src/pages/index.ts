import {createRoutesView} from 'atomic-router-react';

import {LoginRoute} from './login';
import {RegisterRoute} from './register';
import {SearchRoute} from './search';

export const Pages = createRoutesView({
  routes: [SearchRoute, LoginRoute, RegisterRoute],
});
