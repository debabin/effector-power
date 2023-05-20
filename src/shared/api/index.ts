import {AxiosRequestConfig} from 'axios';
import {createEffect} from 'effector';

import {api, mockapi, requestFx} from './request';

export type MealType = 'Lunch' | 'Snack' | 'Breakfast' | 'Snack' | 'Teatime';
type Diet = 'balanced' | 'high-fiber' | 'high-protein' | 'low-carb' | 'low-fat' | 'low-sodium';
type Ingr = `${number}+` | `${number}-${number}` | number;
type Calories = `${number}+` | `${number}-${number}` | number;
type Time = `${number}+` | `${number}-${number}` | number;

interface RecipiesSearch {
  q?: string;
  mealType?: Array<MealType>;
  calories?: Calories;
  from?: number;
  diet?: Array<Diet>;
  ingr?: Ingr;
  time?: Time;
}

type Ingredient = {
  food: string;
  foodCategory: string;
  image: string;
  measure: string;
  quantity: number;
  text: string;
  weight: number;
};
export type Recipe = {
  calories: number;
  cautions: string[];
  cuisineType: string[];
  dietLabels: string[];
  dishType: string[];
  totalNutrients: {
    [key: string]: {label: string; quantity: number; unit: string};
  };
  healthLabels: string[];
  image: string;
  ingredientLines: string[];
  ingredients: Ingredient[];
  label: string;
  mealType: string[];
  shareAs: string;
  source: string;
  totalTime: number;
  totalWeight: number;
  uri: string;
  url: string;
};

type RecipiesSearchDone = {
  from: number;
  to: number;
  q: string;
  count: number;
  hits: {recipe: Recipe}[];
  more: boolean;
  _links: {
    next?: {href: string};
  };
};

export const recipiesSearchFx = createEffect<RecipiesSearch, RecipiesSearchDone>((form) => {
  const urlSearch = new URLSearchParams();
  if (form.q) {
    urlSearch.append('q', form.q);
  }
  if (form.mealType) {
    form.mealType.forEach((mealType) => {
      urlSearch.append('mealType', mealType);
    });
  }
  if (form.calories) {
    urlSearch.append('calories', String(form.calories));
  }

  return requestFx({
    method: 'GET',
    path: `/?${urlSearch.toString()}`,
    instance: 'api',
  });
});

export const recipiesNextPageFx = createEffect<{nextUrl: string}, RecipiesSearchDone>(({nextUrl}) =>
  api({
    method: 'GET',
    url: nextUrl,
  })
    .then((response) => response.data)
    .catch((response) => Promise.reject(response.response.data)),
);

export type User = {
  email: string;
  username: string;
};

interface SignIn {
  email: string;
  password: string;
}

export type SignInError = {error: 'invalid_credentials'} | {error: 'invalid_request'};

export const signInFx = createEffect<SignIn, User, SignInError>(async (form) => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return requestFx({
    path: '/signin',
    method: 'POST',
    body: form,
  });
});

export type SessionGetError = {error: 'unauthorized'};

export const sessionGetFx = createEffect<void, User, SessionGetError>(async () => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return requestFx({
    path: '/session',
    method: 'GET',
  });
});

interface SignUp {
  username: string;
  phone: string;
  email: string;
  password: string;
}

export type SignUpError = {error: 'invalid_credentials'} | {error: 'user_exist'};

export const signUpFx = createEffect<SignUp, null, SignUpError>(async (form) => {
  return requestFx({
    path: '/signup',
    method: 'POST',
    body: form,
  });
});

interface ConfirmPhone {
  code: string;
}

export const confirmPhone = createEffect<ConfirmPhone, User>(async (form) => {
  return requestFx({
    path: '/confirm',
    method: 'POST',
    body: form,
  });
});

type SignUpParams = {
  params: {
    email: string;
    password: string;
    username: string;
  };
  config?: AxiosRequestConfig;
};

type SignUpResponse = {
  email: string;
  username: string;
};

export const signUp = ({params, config}: SignUpParams) =>
  mockapi.post<SignUpResponse>('/signin', {...config, params});

type ResetPasswordParams = {
  params: {
    email: string;
  };
  config?: AxiosRequestConfig;
};

type ResetPasswordResponse = {
  success: boolean;
};

export const resetPassword = ({params, config}: ResetPasswordParams) =>
  mockapi.post<ResetPasswordResponse>('/reset-password', {...config, params});
