import {attach, combine, createEvent, createStore, merge, sample} from 'effector';
import {debounce, not, pending} from 'patronum';

import * as api from '~/shared/api';
import {MealType, Recipe} from '~/shared/api';
import {routes} from '~/shared/routing';
import {chainAuthorized} from '~/shared/session';

export const currentRoute = routes.search;
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.auth.login.open,
});

export const endOfResultsReached = createEvent();
export const searchQueryChanged = createEvent<string>();
export const mealTypeToggled = createEvent<MealType>();
export const kcalChanged = createEvent<number>();
const formChanged = merge([searchQueryChanged, mealTypeToggled, kcalChanged]);

export const $searchQuery = createStore('');
const $mealType = createStore<MealType[]>([]);
const $availableMealTypes = createStore<MealType[]>(['Breakfast', 'Lunch', 'Snack', 'Teatime']);
export const $kcal = createStore(100);

export const $searchResults = createStore<Recipe[]>([]);
const $nextPageLink = createStore<null | string>(null);

export const $currentMealTypes = combine(
  $mealType,
  $availableMealTypes,
  (mealTypes, availableTypes) =>
    availableTypes.map((meal) => ({meal, selected: mealTypes.includes(meal)})),
);

const searchFx = attach({
  source: {q: $searchQuery, mealType: $mealType, kcal: $kcal},
  async effect({q, mealType, kcal}) {
    return api.recipiesSearchFx({
      q,
      mealType,
      calories: `0-${kcal}`,
    });
  },
});

const searchNextPageFx = attach({
  source: $nextPageLink,
  async effect(nextUrl) {
    if (nextUrl) return api.recipiesNextPageFx({nextUrl});
    throw {message: 'no_next_url'};
  },
});

export const $searching = pending({effects: [searchFx, searchNextPageFx]});

sample({
  clock: authorizedRoute.opened,
  target: searchFx,
});

$searchQuery.on(searchQueryChanged, (_, query) => query);
$mealType.on(mealTypeToggled, (list, mealType) => {
  const copy = list.filter((type) => mealType !== type);
  // element deleted
  if (copy.length !== list.length) {
    return copy;
  }

  copy.push(mealType);
  return copy;
});
$kcal.on(kcalChanged, (_, kcal) => kcal);

debounce({
  source: formChanged,
  timeout: 500,
  target: searchFx,
});

$searchResults.on(searchFx.doneData, (_, {hits}) => hits.map((hit) => hit.recipe));

$nextPageLink.on(
  [searchFx.doneData, searchNextPageFx.doneData],
  (_, {_links}) => _links.next?.href ?? null,
);

$searchResults.on(searchNextPageFx.doneData, (list, {hits}) => [
  ...list,
  ...hits.map((hit) => hit.recipe),
]);

sample({
  clock: endOfResultsReached,
  filter: not($searching),
  target: searchNextPageFx,
});
