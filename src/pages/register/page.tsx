import {
  Anchor,
  Button,
  Container,
  Group,
  Input,
  Paper,
  PasswordInput,
  PinInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {IconAt, IconLock, IconPhone, IconUser} from '@tabler/icons-react';
import {Link} from 'atomic-router-react';
import {IMaskInput} from 'react-imask';

import {routes} from '~/shared/routing';

export const RegisterPage = () => (
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

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="username"
          placeholder="username"
          required
          icon={<IconUser size="0.8rem" />}
        />
        <TextInput
          label="email"
          placeholder="email"
          required
          mt="md"
          icon={<IconAt size="0.8rem" />}
        />
        <PasswordInput
          label="password"
          placeholder="your password"
          required
          mt="md"
          icon={<IconLock size="0.8rem" />}
        />
        <Input.Wrapper label="phone" required mt="md">
          <Input
            component={IMaskInput}
            mask="+7 (000) 000-00-00"
            placeholder="Your phone"
            icon={<IconPhone size="0.8rem" />}
          />
        </Input.Wrapper>
        <Group position="right" mt="lg">
          <Anchor component="button" size="sm">
            Already have account?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl">
          Sign up
        </Button>
      </Paper>

      <Title align="center">Validate your phone</Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your code from sms
      </Text>

      <Group position="center" mt="lg">
        <PinInput length={6} />
      </Group>
    </Container>
  </>
);
