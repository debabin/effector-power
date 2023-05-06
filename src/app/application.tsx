import {ActionIcon, Box, ColorScheme, ColorSchemeProvider, MantineProvider} from '@mantine/core';
import {IconMoonStars, IconSun} from '@tabler/icons-react';
import {RouterProvider} from 'atomic-router-react';
import {useState} from 'react';

import {Pages} from '~/pages';

import {router} from '~/shared/routing';

export const App = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  const dark = colorScheme === 'dark';

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{colorScheme}} withGlobalStyles>
        <Box pos="absolute" right={20} top={20}>
          <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
          </ActionIcon>
        </Box>
        <RouterProvider router={router}>
          <Pages />
        </RouterProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
