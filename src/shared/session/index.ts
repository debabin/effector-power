import {chainRoute, RouteInstance, RouteParams, RouteParamsAndQuery} from 'atomic-router';
import {attach, createEvent, createStore, Effect, Event, sample} from 'effector';

import * as api from '~/shared/api';
import {User} from '~/shared/api';

enum AuthStatus {
  Initial = 0,
  Pending,
  Anonymous,
  Authenticated,
}

export const sessionRequestFx = attach({effect: api.sessionGetFx});

export const $user = createStore<User | null>(null);
const $authenticationStatus = createStore(AuthStatus.Initial);

$authenticationStatus.on(sessionRequestFx, (status) => {
  if (status === AuthStatus.Initial) return AuthStatus.Pending;
  return status;
});

$user.on(sessionRequestFx.doneData, (_, user) => user);
$authenticationStatus.on(sessionRequestFx.doneData, () => AuthStatus.Authenticated);

$authenticationStatus.on(sessionRequestFx.fail, () => AuthStatus.Anonymous);
// $user.on(sessionRequestFx.fail, () => null);

interface ChainParams<Params extends RouteParams> {
  otherwise?: Event<void> | Effect<void, any, any>;
}

export function chainAuthorized<Params extends RouteParams>(
  route: RouteInstance<Params>,
  {otherwise}: ChainParams<Params> = {},
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const sessionReceivedAnonymous = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated,
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionRequestFx,
  });

  sample({
    clock: [alreadyAnonymous, sessionRequestFx.fail],
    source: {params: route.$params, query: route.$query},
    filter: route.$isOpened,
    target: sessionReceivedAnonymous,
  });

  if (otherwise) {
    sample({
      clock: sessionReceivedAnonymous,
      target: otherwise as Event<void>,
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAuthenticated, sessionRequestFx.done],
    cancelOn: sessionReceivedAnonymous,
  });
}

export function chainAnonymous<Params extends RouteParams>(
  route: RouteInstance<Params>,
  {otherwise}: ChainParams<Params> = {},
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const sessionReceivedAuthenticated = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated,
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionRequestFx,
  });

  sample({
    clock: [alreadyAuthenticated, sessionRequestFx.done],
    source: {params: route.$params, query: route.$query},
    filter: route.$isOpened,
    target: sessionReceivedAuthenticated,
  });

  if (otherwise) {
    sample({
      clock: sessionReceivedAuthenticated,
      target: otherwise as Event<void>,
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAnonymous, sessionRequestFx.fail],
    cancelOn: sessionReceivedAuthenticated,
  });
}
