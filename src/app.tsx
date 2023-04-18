import { useState } from "react";
import {
  ActionIcon,
  Box,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

import { AuthPage } from "./pages/auth";
import { RegistrationPage } from "./pages/registration";
import { SearchPage } from "./pages/search";

export const App = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const dark = colorScheme === "dark";

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme }} withGlobalStyles>
        <Box pos="absolute" right={20} top={20}>
          <ActionIcon
            variant="outline"
            color={dark ? "yellow" : "blue"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
          </ActionIcon>
        </Box>
        <AuthPage />
        {/* <RegistrationPage /> */}
        {/* <SearchPage /> */}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
