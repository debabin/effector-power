import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Modal,
  Flex,
} from "@mantine/core";
import { IconFaceId, IconAt, IconLock } from "@tabler/icons-react";

export const AuthPage = () => {
  return (
    <Container size={420} my={40} w="100%" h="100vh">
      <Modal
        opened={false}
        onClose={close}
        title="Verify yout identity"
        centered
      >
        <Flex
          justify="center"
          direction="column"
          align="center"
          gap="sm"
          mt="sm"
        >
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
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="email"
          placeholder="email"
          required
          icon={<IconAt size="0.8rem" />}
        />
        <PasswordInput
          label="password"
          placeholder="your password"
          required
          mt="md"
          icon={<IconLock size="0.8rem" />}
        />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl">
          Sign in
        </Button>
        <Button fullWidth mt="sm" variant="light">
          Use face id
        </Button>
      </Paper>
    </Container>
  );
};
