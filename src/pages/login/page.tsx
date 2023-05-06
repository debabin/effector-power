import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Group,
  Modal,
  Paper,
  PasswordInput,
  rem,
  Space,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {IconArrowLeft, IconAt, IconFaceId, IconLock} from '@tabler/icons-react';
import {Link} from 'atomic-router-react';
import {useUnit} from 'effector-react';
import {FormEventHandler, useEffect} from 'react';

import {routes} from '~/shared/routing';

import {
  $email,
  $emailError,
  $error,
  $formDisabled,
  $password,
  $passwordError,
  $passwordLoginPending,
  $webauthnPending,
  emailChanged,
  formSubmitted,
  pageMounted,
  passwordChanged,
} from './model';

export function LoginPage() {
  const [passwordLoginPending, webauthnPending, formDisabled] = useUnit([
    $passwordLoginPending,
    $webauthnPending,
    $formDisabled,
  ]);

  const onFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    formSubmitted();
  };

  useEffect(() => {
    pageMounted();
  }, []);

  return (
    <>
      <Container size={420} my={40} w="100%" h="100vh">
        <Modal opened={false} onClose={close} title="Verify yout identity" centered>
          <Flex justify="center" direction="column" align="center" gap="sm" mt="sm">
            <IconFaceId size="5rem" />
            <Text size="sm">needs to verify you</Text>
            <Button mt="lg" variant="subtle">
              use public key
            </Button>
          </Flex>
        </Modal>

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
          Do not have an account yet?{' '}
          <Anchor component={Link} size="sm" to={routes.auth.register}>
            Create account
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
          <Email />
          <Password />
          <Group position="apart" mt="lg">
            <Anchor component="button" type="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <ErrorView />
          <Button
            fullWidth
            mt="xl"
            type="submit"
            loading={passwordLoginPending}
            disabled={formDisabled}
          >
            Sign in
          </Button>
          <Button
            fullWidth
            mt="sm"
            variant="light"
            type="button"
            loading={webauthnPending}
            disabled={formDisabled}
          >
            Use face id
          </Button>
        </Paper>
      </Container>
    </>
  );
}

const emailErrorText = {
  empty: 'Email не может быть пустым',
  invalid: 'Неверный формат e-mail',
};

function Email() {
  const [email, emailError, formDisabled] = useUnit([$email, $emailError, $formDisabled]);

  return (
    <TextInput
      label="email"
      placeholder="email"
      required
      icon={<IconAt size="0.8rem" />}
      value={email}
      onChange={(event) => emailChanged(event.target.value)}
      disabled={formDisabled}
      error={emailError ? emailErrorText[emailError] : null}
    />
  );
}

const passwordErrorText = {
  empty: 'Пароль не может быть пустым',
  invalid: 'Пароль слишком короткий',
};

function Password() {
  const [password, passwordError, formDisabled] = useUnit([
    $password,
    $passwordError,
    $formDisabled,
  ]);

  return (
    <PasswordInput
      label="password"
      placeholder="your password"
      required
      mt="md"
      icon={<IconLock size="0.8rem" />}
      value={password}
      onChange={(event) => passwordChanged(event.target.value)}
      disabled={formDisabled}
      error={passwordError ? passwordErrorText[passwordError] : null}
    />
  );
}

function ErrorView() {
  const error = useUnit($error);

  if (!error) {
    return <Space h="xl" />;
  }

  if (error?.error === 'invalid_credentials') {
    return <Text c="red">Неверный пароль и/или почта</Text>;
  }

  return <Text c="red">Что-то пошло не так, попробуйте еще раз, пожалуйста</Text>;
}

const ForgotPassword = () => (
  <>
    <Title align="center">Forgot your password?</Title>
    <Text c="dimmed" fz="sm" ta="center">
      Enter your email to get a reset link
    </Text>

    <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
      <TextInput label="Your email" placeholder="me@mantine.dev" required />
      <Group position="apart" mt="lg">
        <Anchor color="dimmed" size="sm">
          <Center inline>
            <IconArrowLeft size={rem(12)} stroke={1.5} />
            <Box ml={5}>Back to the login page</Box>
          </Center>
        </Anchor>
        <Button>Reset password</Button>
      </Group>
    </Paper>
  </>
);
