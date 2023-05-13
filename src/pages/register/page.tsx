import {
  Anchor,
  Button,
  Container,
  Group,
  Input,
  Paper,
  PasswordInput,
  PinInput,
  Space,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {IconAt, IconLock, IconPhone, IconUser} from '@tabler/icons-react';
import {Link} from 'atomic-router-react';
import {useUnit} from 'effector-react';
import {FormEventHandler, useEffect, useId} from 'react';
import {IMaskInput} from 'react-imask';

import {routes} from '~/shared/routing';

import {
  $code,
  $confirmPhone,
  $confirmPhoneFormDisabled,
  $email,
  $emailError,
  $password,
  $passwordError,
  $phone,
  $phoneError,
  $registretionFormDisabled,
  $signUpError,
  $username,
  $usernameError,
  codeChanged,
  confirmPhoneFormSubmitted,
  emailChanged,
  pageMounted,
  passwordChanged,
  phoneChanged,
  registretionFormSubmitted,
  usernameChanged,
} from './model';

export const RegisterPage = () => {
  const [confirmPhone] = useUnit([$confirmPhone]);

  useEffect(() => {
    pageMounted();
  }, []);

  const onFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    registretionFormSubmitted();
  };

  if (confirmPhone) return <ConfrimPhoneForm />;

  return (
    <>
      <Container size={420} my={40} w="100%" h="100vh">
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{' '}
          <Anchor size="sm" component={Link} to={routes.auth.login}>
            Log in
          </Anchor>
        </Text>

        <Paper
          component="form"
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          onSubmit={onFormSubmit}
        >
          <Username />
          <Email />
          <Password />
          <Phone />
          <ErrorView />
          <Button fullWidth mt="xl" type="submit">
            Sign up
          </Button>
        </Paper>
      </Container>
    </>
  );
};

const usernameErrorText = {
  empty: 'Username не может быть пустым',
};

function Username() {
  const [username, usernameError, registretionFormDisabled] = useUnit([
    $username,
    $usernameError,
    $registretionFormDisabled,
  ]);

  return (
    <TextInput
      label="username"
      placeholder="username"
      icon={<IconUser size="0.8rem" />}
      value={username}
      onChange={(event) => usernameChanged(event.target.value)}
      disabled={registretionFormDisabled}
      error={usernameError ? usernameErrorText[usernameError] : null}
    />
  );
}

const emailErrorText = {
  empty: 'Email не может быть пустым',
  invalid: 'Неверный формат e-mail',
};

function Email() {
  const [email, emailError, registretionFormDisabled] = useUnit([
    $email,
    $emailError,
    $registretionFormDisabled,
  ]);

  return (
    <TextInput
      label="email"
      placeholder="email"
      icon={<IconAt size="0.8rem" />}
      value={email}
      onChange={(event) => emailChanged(event.target.value)}
      disabled={registretionFormDisabled}
      error={emailError ? emailErrorText[emailError] : null}
    />
  );
}

const passwordErrorText = {
  empty: 'Пароль не может быть пустым',
  invalid: 'Пароль слишком короткий',
};

function Password() {
  const [password, passwordError, registretionFormDisabled] = useUnit([
    $password,
    $passwordError,
    $registretionFormDisabled,
  ]);

  return (
    <PasswordInput
      label="password"
      placeholder="your password"
      mt="md"
      icon={<IconLock size="0.8rem" />}
      value={password}
      onChange={(event) => passwordChanged(event.target.value)}
      disabled={registretionFormDisabled}
      error={passwordError ? passwordErrorText[passwordError] : null}
    />
  );
}

const phoneErrorText = {
  empty: 'Username не может быть пустым',
};

function Phone() {
  const [phone, phoneError, registretionFormDisabled] = useUnit([
    $phone,
    $phoneError,
    $registretionFormDisabled,
  ]);

  return (
    <Input.Wrapper
      label="phone"
      required
      mt="md"
      error={phoneError ? phoneErrorText[phoneError] : null}
    >
      <Input
        component={IMaskInput}
        mask="+7 (000) 000-00-00"
        placeholder="Your phone"
        icon={<IconPhone size="0.8rem" />}
        value={phone}
        disabled={registretionFormDisabled}
        error={phoneError ? phoneErrorText[phoneError] : null}
        onChange={(event: any) => phoneChanged(event.target.value)}
      />
    </Input.Wrapper>
  );
}

function ErrorView() {
  const error = useUnit($signUpError);

  if (!error) {
    return <Space h="xl" />;
  }

  if (error?.error === 'invalid_credentials') {
    return <Text c="red">Неверный пароль и/или почта</Text>;
  }

  if (error?.error === 'user_exist') {
    return <Text c="red">Username уже занят</Text>;
  }

  return <Text c="red">Что-то пошло не так, попробуйте еще раз, пожалуйста</Text>;
}

function ConfrimPhoneForm() {
  const [code, confirmPhone, confirmPhoneFormDisabled] = useUnit([
    $code,
    $confirmPhone,
    $confirmPhoneFormDisabled,
  ]);

  return (
    <Container size={420} my={40} w="100%" h="100vh">
      <Title align="center">Validate your phone</Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your code from sms
      </Text>

      <Group position="center" mt="lg">
        <PinInput
          value={code}
          length={6}
          disabled={confirmPhoneFormDisabled}
          onChange={(value) => {
            codeChanged(value);
            if (value.length === 6) {
              confirmPhoneFormSubmitted();
            }
          }}
        />
      </Group>
    </Container>
  );
}
