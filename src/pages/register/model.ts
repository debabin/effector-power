import {attach, createEvent, createStore, sample} from 'effector';
import {and, empty, every, not, reset} from 'patronum';

import * as api from '~/shared/api';
import {routes} from '~/shared/routing';
import {chainAnonymous, sessionRequestFx} from '~/shared/session';

export const currentRoute = routes.auth.register;
export const anonymousRoute = chainAnonymous(currentRoute, {
  otherwise: routes.search.open,
});

const signUpFx = attach({effect: api.signUpFx});
const confirmPhoneFx = attach({effect: api.confirmPhone});

export const createField = <Value, Error>(defaultValue: Value) => {
  const $value = createStore(defaultValue);
  const $error = createStore<Error | null>(null);
  const $set = createEvent<string>();
  return [$value, $set, $error] as const;
};

export const [$email, emailChanged, $emailError] = createField<string, null | 'empty' | 'invalid'>(
  '',
);
export const [$username, usernameChanged, $usernameError] = createField<string, null | 'empty'>('');
export const [$password, passwordChanged, $passwordError] = createField<
  string,
  null | 'empty' | 'invalid'
>('');
export const [$phone, phoneChanged, $phoneError] = createField<string, null | 'empty'>('');

export const $code = createStore('');
export const codeChanged = createEvent<string>();

export const $signUpError = createStore<api.SignUpError | null>(null);
export const $confirmPhone = createStore(false);

export const pageMounted = createEvent();
reset({
  clock: pageMounted,
  target: [
    $email,
    $emailError,
    $password,
    $passwordError,
    $username,
    $usernameError,
    $phone,
    $phoneError,
    $code,
    $signUpError,
    $confirmPhone,
  ],
});

export const $registretionFormDisabled = signUpFx.pending;
const $registretionFormValid = every({
  // @ts-ignore
  stores: [$emailError, $passwordError, $usernameError, $phoneError],
  predicate: null,
});
export const registretionFormSubmitted = createEvent();

export const confirmPhoneFormSubmitted = createEvent();
export const $confirmPhoneFormDisabled = confirmPhoneFx.pending;

$email.on(emailChanged, (_, email) => email);
$username.on(usernameChanged, (_, username) => username);
$password.on(passwordChanged, (_, password) => password);
$phone.on(phoneChanged, (_, phone) => phone);
$code.on(codeChanged, (_, code) => code);

$signUpError.reset(registretionFormSubmitted);

sample({
  clock: registretionFormSubmitted,
  source: $email,
  fn: (email) => {
    if (isEmpty(email)) return 'empty';
    if (!isEmailValid(email)) return 'invalid';
    return null;
  },
  target: $emailError,
});

sample({
  clock: registretionFormSubmitted,
  source: $username,
  fn: (username) => {
    if (isEmpty(username)) return 'empty';
    return null;
  },
  target: $usernameError,
});

sample({
  clock: registretionFormSubmitted,
  source: $password,
  fn: (password) => {
    if (isEmpty(password)) return 'empty';
    if (!isPasswordValid(password)) return 'invalid';
    return null;
  },
  target: $passwordError,
});

sample({
  clock: registretionFormSubmitted,
  source: $phone,
  fn: (phone) => {
    if (isEmpty(phone)) return 'empty';
    return null;
  },
  target: $phoneError,
});

sample({
  clock: registretionFormSubmitted,
  source: {email: $email, password: $password, phone: $phone, username: $username},
  filter: and(not($registretionFormDisabled), $registretionFormValid),
  target: signUpFx,
});

$signUpError.on(signUpFx.failData, (_, error) => error);
$confirmPhone.on(signUpFx.done, () => true);

sample({
  clock: confirmPhoneFormSubmitted,
  source: {code: $code},
  filter: not($registretionFormDisabled),
  target: confirmPhoneFx,
});

sample({
  clock: confirmPhoneFx.done,
  target: sessionRequestFx,
});

function isEmailValid(email: string) {
  return email.includes('@') && email.length > 5;
}

function isPasswordValid(password: string) {
  return password.length > 5;
}

function isEmpty(input: string) {
  return input.trim().length === 0;
}
